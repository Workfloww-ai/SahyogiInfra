import os
import resend
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.getenv('RESEND_API_KEY')

print(f"API Key: {resend.api_key[:5]}...{resend.api_key[-5:] if resend.api_key else 'None'}")
try:
    response = resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": ["test@example.com"],
        "subject": "Hello World",
        "html": "<p>Congrats on sending your <strong>first email</strong>!</p>"
    })
    print(response)
except Exception as e:
    import traceback
    traceback.print_exc()
