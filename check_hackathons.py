import paramiko

host = "72.62.181.25"
user = "root"
password = "Asitech2026@"

try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, username=user, password=password, timeout=10)
    
    cmd = """cd /var/www/codetowin-api && source backend/venv/bin/activate && python backend/manage.py shell -c "from hackathons.models import Hackathon; print('COUNT:', Hackathon.objects.count())" """
    
    stdin, stdout, stderr = ssh.exec_command(cmd)
    print(stdout.read().decode('utf-8'))
    err = stderr.read().decode('utf-8')
    if err:
        print("ERR:", err)
        
    ssh.close()
except Exception as e:
    print(f"Error: {e}")
