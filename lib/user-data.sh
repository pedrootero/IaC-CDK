#!/bin/bash
sudo su
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Serviço rodando $(hostname -f)</h1>" > /var/www/html/index.html