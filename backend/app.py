import os
import re
import time
import datetime
import csv
from flask import Flask, request, jsonify, make_response, send_file, render_template_string, redirect, url_for, session
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from dotenv import load_dotenv
from models import Session, Submission

load_dotenv()

# === CONFIG ===
from sheets import sheet

# === FLASK APP ===
app = Flask(__name__)
CORS(app, origins="*")
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'changeme')

LOGIN = os.getenv('ADMIN_LOGIN', 'admin')
PASSWORD = os.getenv('ADMIN_PASSWORD', 'supersecret123')

login_form_html = '''
<!DOCTYPE html>
<html>
<head>
  <title>Admin Login</title>
  <style>
    body { font-family: sans-serif; background: #f6f6fb; }
    .login-box {
      max-width: 340px;
      margin: 120px auto;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 8px 32px #814BF644;
      padding: 40px 32px 32px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h2 {
      text-align: center;
      color: #814BF6;
      margin-bottom: 28px;
      width: 100%;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }
    input {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 1rem;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 12px;
      background: #814BF6;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      cursor: pointer;
      margin-top: 6px;
    }
    .error {
      color: #d00;
      text-align: center;
      margin-bottom: 12px;
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h2>Admin Login</h2>
    {% if error %}<div class="error">{{ error }}</div>{% endif %}
    <form method="post">
      <input type="text" name="login" placeholder="Login" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Sign In</button>
    </form>
  </div>
</body>
</html>
'''

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = ''
    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')
        if login == LOGIN and password == PASSWORD:
            session['auth'] = True
            return redirect(url_for('export_csv'))
        else:
            error = 'Invalid credentials'
    return render_template_string(login_form_html, error=error)

@app.route('/logout')
def logout():
    session.pop('auth', None)
    return redirect(url_for('login'))



@app.route('/export', methods=['GET'])
def export_csv():
    if not session.get('auth'):
        return redirect(url_for('login'))
    dbsession = Session()
    submissions = dbsession.query(Submission).order_by(Submission.created_at).all()
    dbsession.close()
    filename = 'submissions_export.csv'
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['ID', 'Name', 'Email', 'Business', 'Created At'])
        for s in submissions:
            writer.writerow([s.id, s.name, s.email, s.business, s.created_at])
    return send_file(filename, as_attachment=True)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    from sheets import client
    data = request.get_json()
    email = data.get('email', '').strip()
    if not email or '@' not in email:
        return jsonify({'success': False, 'message': 'Invalid email.'}), 400
    try:
        sheet = client.open_by_key('1GP7N6pJqQGibZPVtSdWMrQVWpclEcTVqmhe46bq_-vw').worksheet('Subscribe (newsletter)')
        sheet.append_row([email, datetime.datetime.now().isoformat()])
        return jsonify({'success': True, 'message': 'Thanks for subscribe!'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error: {str(e)}'}), 500

from popup_lead.submit import popup_lead_bp
app.register_blueprint(popup_lead_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)