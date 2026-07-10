import requests

try:
    response = requests.post('https://api.codetowin.pro/api/auth/log-otp', json={'email': 'test@example.com'}, timeout=10)
    print("Status Code:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("Error:", str(e))
