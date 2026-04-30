import os
import re
import smtplib
from email.message import EmailMessage
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# CORS: Allow only your production domain(s).
# Set ALLOWED_ORIGINS in Vercel env vars, e.g.:
# ALLOWED_ORIGINS=https://sahyogiinfra.vercel.app,https://www.sahyogi.net.in
_raw_origins = os.getenv('ALLOWED_ORIGINS', '')
allowed_origins = [o.strip() for o in _raw_origins.split(',') if o.strip()]
CORS(app, origins=allowed_origins or ['http://localhost:3000', 'http://localhost:5173'])

EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

ALLOWED_DIVISIONS = {
    'Staffing - Leadership / CXO',
    'Staffing - Bulk Hiring',
    'Staffing - Contract / Off-Roll',
    'Hospitality - Resort Management',
    'Hospitality - Managed Apartments',
    'Other Services',
}


@app.route('/api/contact', methods=['POST'])
def contact():
    if not request.is_json:
        return jsonify({'error': 'Content-Type must be application/json'}), 415

    data = request.get_json(silent=True) or {}

    # Sanitise and cap field lengths
    full_name    = str(data.get('fullName', '')).strip()[:200]
    organisation = str(data.get('organisation', '')).strip()[:200]
    email_address= str(data.get('emailAddress', '')).strip()[:200]
    division     = str(data.get('divisionOfInterest', '')).strip()[:100]
    requirement  = str(data.get('yourRequirement', '')).strip()[:2000]

    if not all([full_name, organisation, email_address, division, requirement]):
        return jsonify({'error': 'All fields are required'}), 400

    if not EMAIL_RE.match(email_address):
        return jsonify({'error': 'Invalid email address format'}), 400

    if division not in ALLOWED_DIVISIONS:
        return jsonify({'error': 'Invalid division selected'}), 400

    gmail_user     = os.getenv('GMAIL_USER')
    gmail_password = os.getenv('GMAIL_APP_PASSWORD')
    recipient_email= os.getenv('RECIPIENT_EMAIL')

    if not all([gmail_user, gmail_password, recipient_email]):
        return jsonify({'error': 'Server configuration error. Please contact us directly.'}), 500

    msg = EmailMessage()
    msg['Subject']  = f'New Business Enquiry from {full_name} ({organisation})'
    msg['From']     = gmail_user
    msg['To']       = recipient_email
    msg['Reply-To'] = email_address
    msg.set_content(
        f"New Business Enquiry Details:\n\n"
        f"Full Name: {full_name}\n"
        f"Organisation: {organisation}\n"
        f"Email Address: {email_address}\n"
        f"Division of Interest: {division}\n\n"
        f"Requirement:\n{requirement}\n"
    )

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(gmail_user, gmail_password)
            smtp.send_message(msg)
        return jsonify({'success': True}), 200
    except smtplib.SMTPAuthenticationError:
        return jsonify({'error': 'Email service error. Please contact us directly.'}), 500
    except Exception:
        return jsonify({'error': 'Failed to send enquiry. Please try again later.'}), 500
