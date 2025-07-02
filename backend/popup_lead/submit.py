import time
from flask import Blueprint, request, jsonify, make_response
from sqlalchemy.orm import sessionmaker
from models import Session, Submission
from sheets import sheet

popup_lead_bp = Blueprint('popup_lead', __name__)

# Простая in-memory защита от спама
last_submit = {}

import traceback

@popup_lead_bp.route('/submit', methods=['POST'])
def submit():
    print('submit() called')
    try:
        data = request.get_json(force=True, silent=True) or {}
        print('Parsed JSON:', data)
        name = (data.get('name') or '').strip()
        email = (data.get('email') or '').strip()
        business = (data.get('business') or '').strip()

        ip = request.remote_addr
        now = time.time()
        if ip in last_submit and now - last_submit[ip] < 30:
            print('Too many requests from', ip)
            return make_response(jsonify({'status': 'error', 'message': 'Too many requests. Please wait.'}), 429)
        last_submit[ip] = now

        if not name or not email or not business:
            print('Validation failed:', name, email, business)
            return make_response(jsonify({'status': 'error', 'message': 'All fields required.'}), 400)

        try:
            session = Session()
            submission = Submission(name=name, email=email, business=business)
            session.add(submission)
            session.commit()
            session.close()
            print('Saved to DB')
        except Exception as db_exc:
            print(f"Database error in submit function: {db_exc}")
            traceback.print_exc()
            print('Returning DB error')
            return jsonify({'status': 'error', 'message': 'Database error'}), 500

        try:
            if not sheet.row_values(1):
                sheet.append_row(['Name', 'Email', 'Business Niche'])
            sheet.append_row([name, email, business])
            print('Appended to Google Sheets')
        except Exception as e:
            print(f"Error appending to Google Sheets: {e}")
            traceback.print_exc()
            print('Returning Sheets fallback')
            return jsonify({'status': 'ok', 'message': 'Saved to local DB only (Google Sheets unavailable)'}), 200

        print('Returning OK')
        return jsonify({'status': 'ok'})
    except Exception as e:
        print(f"Error in submit function: {e}")
        traceback.print_exc()
        print('Returning internal server error')
        return jsonify({'status': 'error', 'message': 'Internal server error'}), 500
    print('Returning fallback unknown error')
    return jsonify({'status': 'error', 'message': 'Unknown error'}), 500
