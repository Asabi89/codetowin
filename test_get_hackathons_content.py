import paramiko

host = "72.62.181.25"
user = "root"
password = "Asitech2026@"

try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, username=user, password=password, timeout=10)
    
    script = """
from rest_framework.test import APIClient
from authentication.models import User

user = User.objects.filter(role='ORGANIZER').first()
client = APIClient(SERVER_NAME='api.codetowin.pro')
client.force_authenticate(user=user)

res = client.get('/api/hackathons?organizer=me')
print('STATUS:', res.status_code)
print('CONTENT:', res.content.decode('utf-8'))
"""
    
    cmd = f"""cd /var/www/codetowin-api && source backend/venv/bin/activate && python backend/manage.py shell -c "{script}" """
    
    stdin, stdout, stderr = ssh.exec_command(cmd)
    print("STDOUT:", stdout.read().decode('utf-8'))
    print("STDERR:", stderr.read().decode('utf-8'))
        
    ssh.close()
except Exception as e:
    print(f"Error: {e}")
