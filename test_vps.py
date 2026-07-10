import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('72.62.181.25', username='root', password='Asitech2026@')

patch = """
systemctl restart codetowin-api
journalctl -u codetowin-api -n 20 --no-pager
"""
stdin, stdout, stderr = ssh.exec_command(patch)
print(stdout.read().decode('utf-8'))
