#!/bin/bash
sudo su
yum install -y nginx
systemctl start nginx
systemctl enable nginx
