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

# # Start MySQL in safe mode without loading the grant tables and skip networking
# sudo /usr/sbin/mysqld --skip-grant-tables --skip-networking &

# # Sleep to ensure MySQL has started
# sleep 5

# # Connect to MySQL
# sudo mysql -u "${MYSQL_USERNAME}" <<EOF
# FLUSH PRIVILEGES;
# ALTER USER ${MYSQL_USERNAME}@${MYSQL_SERVER_URL} IDENTIFIED BY 7758015455.Abde;
# FLUSH PRIVILEGES;
# EXIT;
# EOF

# # Create database
# sudo mysql -u "${MYSQL_USERNAME}" -p"${MYSQL_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABSE};"

# Install Node and npm
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo apt install -y nodejs

# Install project dependencies
cd ../
npm install





