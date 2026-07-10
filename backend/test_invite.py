import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codetowin.settings')
django.setup()
from django.core.mail import send_mail
try:
    send_mail('Test', 'Test', 'CodeToWin <invite@codetowin.pro>', ['test@example.com'])
    print("CodeToWin SUCCESS")
except Exception as e:
    print(f"CodeToWin ERROR: {e}")

try:
    send_mail('Test', 'Test', 'codetowin <invite@codetowin.pro>', ['test@example.com'])
    print("codetowin SUCCESS")
except Exception as e:
    print(f"codetowin ERROR: {e}")
