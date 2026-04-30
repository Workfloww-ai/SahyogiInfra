import os
import smtplib
from email.message import EmailMessage
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes (to allow React frontend to communicate with Flask)
CORS(app)

@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    
    if not data:
        return jsonify({"error": "No data provided"}), 400

    full_name = data.get('fullName')
    organisation = data.get('organisation')
    email_address = data.get('emailAddress')
    division = data.get('divisionOfInterest')
    requirement = data.get('yourRequirement')

    if not all([full_name, organisation, email_address, division, requirement]):
        return jsonify({"error": "All fields are required"}), 400

    gmail_user = os.getenv('GMAIL_USER')
    gmail_password = os.getenv('GMAIL_APP_PASSWORD')
    recipient_email = os.getenv('RECIPIENT_EMAIL')

    if not all([gmail_user, gmail_password, recipient_email]):
        return jsonify({"error": "Server email configuration is missing"}), 500

    msg = EmailMessage()
    msg['Subject'] = f"New Business Enquiry from {full_name} ({organisation})"
    msg['From'] = gmail_user
    msg['To'] = recipient_email
    # Set the Reply-To header to the enquirer's email
    msg['Reply-To'] = email_address

    email_content = f"""
New Business Enquiry Details:

Full Name: {full_name}
Organisation: {organisation}
Email Address: {email_address}
Division of Interest: {division}

Requirement:
{requirement}
"""
    msg.set_content(email_content)

    try:
        # Connect to Gmail SMTP server
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(gmail_user, gmail_password)
            smtp.send_message(msg)
        
        return jsonify({"success": True}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": "Failed to send email"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
