import paramiko

host = "72.62.181.25"
user = "root"
password = "Asitech2026@"

try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, username=user, password=password, timeout=10)
    
    script = """
import json
from datetime import datetime, timedelta
from rest_framework.test import APIClient
from authentication.models import User
from hackathons.serializers import HackathonSerializer

user = User.objects.filter(role='ORGANIZER').first()
payload = {
    'title': 'Test Hackathon from APIClient',
    'description': 'Description',
    'type': 'En ligne',
    'location': 'En ligne',
    'prize': '100',
    'registration_mode': 'open',
    'participant_limit': 100,
    'min_team_size': 1,
    'max_team_size': 4,
    'registration_start': None,
    'registration_end': None,
    'start_date': datetime.now().isoformat(),
    'end_date': (datetime.now() + timedelta(days=5)).isoformat(),
    'overview': 'overview',
    'resources': '',
    'rules': '',
    'faqs': [],
    'jury_questions': [],
    'interest': '',
    'technologies': '',
    'mentors': [],
    'status': 'brouillon',
    'deadline': 'Pas de date'
}

serializer = HackathonSerializer(data=payload)
if serializer.is_valid():
    serializer.save(organizer=user.organizer_profile)
    print('SUCCESS')
else:
    print('ERRORS: ' + str(serializer.errors))
"""
    
    cmd = f"""cd /var/www/codetowin-api && source backend/venv/bin/activate && python backend/manage.py shell -c "{script}" """
    
    stdin, stdout, stderr = ssh.exec_command(cmd)
    print("STDOUT:", stdout.read().decode('utf-8'))
    print("STDERR:", stderr.read().decode('utf-8'))
        
    ssh.close()
except Exception as e:
    print(f"Error: {e}")
