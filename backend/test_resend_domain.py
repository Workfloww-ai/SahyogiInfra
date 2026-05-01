import os
import resend
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.getenv('RESEND_API_KEY')

try:
    response = resend.Emails.send({
        "from": "no-reply@sahyogi.net.in",
        "to": ["amit.tiwari@sahyogi.net.in"],
        # "subject": "Hello World",
        # "html": "<p>Congrats on sending your <strong>first email</strong>!</p>"
    })
    print(response)
except Exception as e:
    import traceback
    traceback.print_exc()
