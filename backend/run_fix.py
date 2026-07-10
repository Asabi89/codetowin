import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('72.62.181.25', username='root', password='Asitech2026@')

code = """import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "codetowin.settings")
django.setup()
from hackathons.models import TeamMember, HackathonRegistration
for m in TeamMember.objects.all():
    HackathonRegistration.objects.get_or_create(hackathon=m.team.hackathon, participant=m.participant, defaults={"status": "approved"})
print("Done fixing registrations!")
"""

with open("fix_regs.py", "w") as f:
    f.write(code)

sftp = ssh.open_sftp()
sftp.put("fix_regs.py", "/var/www/codetowin-api/backend/fix_regs.py")
sftp.close()

stdin, stdout, stderr = ssh.exec_command('cd /var/www/codetowin-api/backend && source venv/bin/activate && python fix_regs.py')
print(stdout.read().decode())
print(stderr.read().decode())
ssh.close()
