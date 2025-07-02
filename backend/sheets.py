import gspread
from oauth2client.service_account import ServiceAccountCredentials

SPREADSHEET_ID = '1GP7N6pJqQGibZPVtSdWMrQVWpclEcTVqmhe46bq_-vw'
SHEET_NAME = 'Lead-Magnet (WEB)'
CREDENTIALS_FILE = 'credentials.json'

scope = [
    'https://spreadsheets.google.com/feeds',
    'https://www.googleapis.com/auth/drive'
]
creds = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE, scope)
client = gspread.authorize(creds)
sheet = client.open_by_key(SPREADSHEET_ID).worksheet(SHEET_NAME)