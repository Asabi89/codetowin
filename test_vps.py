import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('72.62.181.25', username='root', password='Asitech2026@')

patch = """
cd /var/www/codetowin-api && git stash && git pull origin org
systemctl restart codetowin-api
"""
stdin, stdout, stderr = ssh.exec_command(patch)
print(stdout.read().decode('utf-8'))
print(stderr.read().decode('utf-8'))
