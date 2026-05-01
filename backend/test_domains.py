import os
import resend
from dotenv import load_dotenv

load_dotenv()
resend.api_key = os.getenv('RESEND_API_KEY')
try:
    domains = resend.Domains.list()
    print("Verified domains:", domains)
except Exception as e:
    print("Error listing domains:", e)
