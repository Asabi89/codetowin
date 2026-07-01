import paramiko

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=30):
    print(f"\n>>> {cmd[:100]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    print((out + err)[-3000:])
    return out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

# Quick test - what URL did they visit?
run(client, "curl -s -o /dev/null -w 'api.codetowin.pro root: %{http_code}' https://api.codetowin.pro/")
run(client, "curl -s -o /dev/null -w 'api.codetowin.pro/api/: %{http_code}' https://api.codetowin.pro/api/")
run(client, "curl -s -o /dev/null -w 'api.codetowin.pro/api/hackathons: %{http_code}' https://api.codetowin.pro/api/hackathons")

# Update Nginx config - add root redirect to /api/schema/swagger-ui/ or just return JSON info
nginx_api = """server {
    server_name api.codetowin.pro;
    client_max_body_size 50M;

    # Root redirect -> show API info
    location = / {
        return 302 https://api.codetowin.pro/api/schema/swagger-ui/;
    }

    # Strip trailing slash (Django router uses trailing_slash=False)
    location ~* ^/api/(.+)/$ {
        return 301 https://api.codetowin.pro/api/$1;
    }

    location / {
        proxy_pass http://127.0.0.1:8015;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /media/ {
        alias /var/www/codetowin-api/backend/media/;
        add_header Cache-Control "public, max-age=31536000";
    }

    location /static/ {
        alias /var/www/codetowin-api/backend/staticfiles/;
        add_header Cache-Control "public, max-age=31536000";
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/api.codetowin.pro/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.codetowin.pro/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = api.codetowin.pro) {
        return 301 https://$host$request_uri;
    }
    listen 80;
    server_name api.codetowin.pro;
    return 404;
}
"""

run(client, f"cat > /etc/nginx/sites-available/codetowin-api << 'NEOF'\n{nginx_api}NEOF")
run(client, "nginx -t 2>&1 | tail -3")
run(client, "systemctl reload nginx")

# Verify
run(client, "curl -s -o /dev/null -w 'Root / : %{http_code}\\n' https://api.codetowin.pro/")
run(client, "curl -s -o /dev/null -w 'API /api/ : %{http_code}\\n' https://api.codetowin.pro/api/")
run(client, "curl -s -o /dev/null -w 'Hackathons: %{http_code}\\n' https://api.codetowin.pro/api/hackathons")
run(client, "curl -s -o /dev/null -w 'Login: %{http_code}\\n' https://api.codetowin.pro/api/auth/login")

client.close()
