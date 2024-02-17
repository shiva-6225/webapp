#!/bin/bash
set -e

# Update package repos
sudo yum update -y

# Install MySQL server
sudo yum install -y mysql-server

# Start MySQL service
sudo systemctl start mysqld

# Enable MySQL to start on boot
sudo systemctl enable mysqld

# Secure MySQL installation (set root password, remove anonymous users, etc.)
sudo mysql_secure_installation <<EOF
y  # Answer 'yes' to set up the Validate Password Plugin
${MYSQL_ROOT_PASSWORD}  # Set root password to the value of MYSQL_ROOT_PASSWORD environment variable
${MYSQL_ROOT_PASSWORD}  # Confirm root password
y  # Remove anonymous users
y  # Disallow root login remotely
y  # Remove the test database and access to it
y  # Reload the privilege tables now
EOF

# Run SQL queries to set MySQL user password and create database
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" <<MYSQL_SCRIPT
ALTER USER '${MYSQL_USERNAME}'@'${MYSQL_SERVER_URL}' IDENTIFIED BY '${MYSQL_PASSWORD}';
CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};
MYSQL_SCRIPT

# Install Node and npm
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs

# Install project dependencies
cd ../
npm install





