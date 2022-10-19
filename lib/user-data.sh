#!/bin/bash
sudo su
yum install -y httpd
systemctl start httpd
systemctl enable httpd
