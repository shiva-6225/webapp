#!/bin/bash
set -e

# Update package repos
sudo apt update -y

# Install MySQL server
sudo apt install -y mysql-server

# Start MySQL service
sudo systemctl start mysql

# Enable MySQL to start on boot
sudo systemctl enable mysql

# Function to reset MySQL root password
reset_mysql_password() {
    sudo mysql -u "${MYSQL_USERNAME}" <<EOF
FLUSH PRIVILEGES;
use mysql;
UPDATE user SET authentication_string=PASSWORD("${MYSQL_PASSWORD}") WHERE user="${MYSQL_USERNAME}";
FLUSH PRIVILEGES;
EXIT;
EOF
}

# Set MySQL root password
reset_mysql_password

# Create database named "CSYE"
sudo mysql -u "${MYSQL_USERNAME}" -p"${MYSQL_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};"

# Install Node and npm
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo apt install -y nodejs

# Install project dependencies
cd ../
npm install

echo "MySQL root password has been successfully reset."
