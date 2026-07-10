import paramiko

host = "72.62.181.25"
user = "root"
password = "Asitech2026@"

try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, username=user, password=password, timeout=10)
    
    script = """
import requests

res = requests.options(
    'https://api.codetowin.pro/api/auth/me',
    headers={
        'Origin': 'https://codetowin.pro',
        'Access-Control-Request-Method': 'PATCH',
        'Access-Control-Request-Headers': 'Authorization, Content-Type'
    }
)

print('STATUS:', res.status_code)
print('HEADERS:', res.headers)
"""
    
    cmd = f"""python3 -c "{script}" """
    
    stdin, stdout, stderr = ssh.exec_command(cmd)
    print("STDOUT:", stdout.read().decode('utf-8'))
    print("STDERR:", stderr.read().decode('utf-8'))
        
    ssh.close()
except Exception as e:
    print(f"Error: {e}")
