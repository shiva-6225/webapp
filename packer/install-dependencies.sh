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

# Set MySQL root password
sudo mysql -e "ALTER USER ${MYSQL_USERNAME}@${MYSQL_SERVER_URL} IDENTIFIED BY '${MYSQL_PASSWORD}';"

# Create database named "CSYE"
sudo mysql -u "${MYSQL_USERNAME}" -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABSE};"

# Install Node and npm
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo apt install -y nodejs

# Install project dependencies
cd ../
npm install





