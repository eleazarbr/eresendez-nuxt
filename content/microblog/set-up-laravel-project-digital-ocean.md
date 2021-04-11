---
title: ¿Cómo configurar un Laravel Project en Digital Ocean?
summary: Guía sencilla de pasos que tampoco quiero recordar para configurar un Laravel Project en Digital Ocean.
tags:
- laravel
---

Probablemente esto se convierta en un blog-post.

Guía sencilla de pasos que no quiero recordar; lo escribo aquí para consultarlo despues cuando sea necesario.

**Instalar la última versión de Laravel localmente**
`composer create-project --prefer-dist laravel/laravel appName`

**Configurar el repositorio remote y hacer primer commit**
```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/username/project.git
git push -u origin master
```

**Pasos en el servidor**
```bash
sudo mkdir -p /var/www/project.com/html
sudo chown -R $USER:$USER /var/www/project.com/html
sudo chmod -R 755 /var/www/project.com

cd /var/www/project.com/html
git clone https://github.com/username/project.git
git config --global credential.helper cache

# enter cloned dir, copy files to parent dir
find . -maxdepth 1 -exec mv {} .. \;
cd ..

composer install
npm install

sudo nano .env
```

**NGINX settings**
```bash
sudo nano /etc/nginx/sites-available/project.com
```

```bash
server {
    listen 80;
    listen [::]:80;
    server_name project.com www.project.com;
    return 302 https://$server_name$request_uri;
}

server {
    # SSL configuration
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    ssl        on;
    ssl_certificate         /etc/ssl/certs/cert-project.pem;
    ssl_certificate_key     /etc/ssl/private/key-project.pem;
    ssl_client_certificate  /etc/ssl/certs/cloudflare.crt;
    ssl_verify_client on;

    server_name project.com www.project.com;

    root /var/www/project.com/html/public;
    index index.php index.html index.htm index.nginx-debian.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }

    location ~ /.well-known {
        allow all;
    }
}
```

Add site in Cloudflare.
- Configure DNS
- Create, get and set Cloudflare SSL Certificate
```bash
sudo nano /etc/ssl/certs/cert-project.pem
sudo nano /etc/ssl/private/key-project.pem
sudo nano /etc/ssl/certs/cloudflare.crt
```

