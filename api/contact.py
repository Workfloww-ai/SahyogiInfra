import os
import re
import html
import resend
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv('RESEND_API_KEY')

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

@app.route('/api/contact', methods=['POST', 'OPTIONS'])
def contact():
    if request.method == 'OPTIONS':
        return '', 200

    if not request.is_json:
        return jsonify({'success': False, 'error': 'Content-Type must be application/json'}), 415

    data = request.get_json(silent=True) or {}

    # Sanitise and cap field lengths. 
    # Fallback to 'name', 'email', 'message' to support both old and new form fields.
    full_name    = str(data.get('fullName') or data.get('name', '')).strip()[:200]
    organisation = str(data.get('organisation', '')).strip()[:200]
    email_address= str(data.get('emailAddress') or data.get('email', '')).strip()[:200]
    division     = str(data.get('divisionOfInterest', '')).strip()[:100]
    requirement  = str(data.get('yourRequirement') or data.get('message', '')).strip()[:2000]

    if not full_name or not email_address or not requirement:
        return jsonify({'success': False, 'error': 'Name, email, and message are required'}), 400

    if not EMAIL_RE.match(email_address):
        return jsonify({'success': False, 'error': 'Invalid email address format'}), 400

    if division and division not in ALLOWED_DIVISIONS:
        return jsonify({'success': False, 'error': 'Invalid division selected'}), 400

    owner_email = os.getenv('RECIPIENT_EMAIL')
    if not owner_email:
        return jsonify({'success': False, 'error': 'Server configuration error (missing RECIPIENT_EMAIL).'}), 500

    if not resend.api_key:
        return jsonify({'success': False, 'error': 'Server configuration error (missing RESEND_API_KEY).'}), 500

    # Escape HTML to prevent XSS
    safe_name = html.escape(full_name)
    safe_email = html.escape(email_address)
    safe_org = html.escape(organisation) if organisation else "N/A"
    safe_div = html.escape(division) if division else "N/A"
    safe_req = html.escape(requirement).replace('\n', '<br>')

    html_content = f"""
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {safe_name}</p>
    <p><strong>Email:</strong> {safe_email}</p>
    <p><strong>Organisation:</strong> {safe_org}</p>
    <p><strong>Division of Interest:</strong> {safe_div}</p>
    <p><strong>Message/Requirement:</strong></p>
    <p>{safe_req}</p>
    """

    try:
        from_email = os.getenv('SENDER_EMAIL')
        resend.Emails.send({
            "from": from_email,
            "to": [owner_email],
            "reply_to": email_address,
            "subject": f"New Contact Form Submission from {full_name}",
            "html": html_content
        })
        return jsonify({'success': True}), 200
    except Exception as e:
        # Log the actual error to the server console for debugging
        print(f"Resend Error: {str(e)}")
        # Return a clean error to the client
        return jsonify({'success': False, 'error': 'Failed to send notification email.'}), 500
