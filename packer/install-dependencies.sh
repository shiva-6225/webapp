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

# Set MySQL root password
sudo mysql -e "ALTER USER ${MYSQL_USERNAME}@${MYSQL_SERVER_URL} IDENTIFIED BY '${MYSQL_PASSWORD}';"

# Create database named "CSYE"
sudo mysql -u "${MYSQL_USERNAME}" -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS CSYE6225;"

# Install Node and npm
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum install -y nodejs

# Install project dependencies
cd ../
npm install