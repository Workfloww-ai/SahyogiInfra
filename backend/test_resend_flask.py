import os
import resend
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.getenv('RESEND_API_KEY')

print(f"API Key: {resend.api_key[:5]}...{resend.api_key[-5:] if resend.api_key else 'None'}")
try:
    owner_email = os.getenv('OWNER_EMAIL') or os.getenv('RECIPIENT_EMAIL')
    print("Owner email:", repr(owner_email))
    response = resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": [owner_email],
        "subject": "Hello World",
        "html": "<p>Congrats on sending your <strong>first email</strong>!</p>"
    })
    print(response)
except Exception as e:
    import traceback
    traceback.print_exc()
