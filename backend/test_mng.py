import paramiko
client=paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('72.62.181.25', username='root', password='Asitech2026@')
stdin,stdout,stderr=client.exec_command('curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8104')
print(stdout.read().decode())
client.close()
