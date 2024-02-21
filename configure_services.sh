#!/bin/bash
set -e

# MYSQL_USERNAME="root"
# MYSQL_PASSWORD="7758015455.Abde"
# MYSQL_PORT="3306"
# MYSQL_DATABASE="CSYE6225"
# MYSQL_SERVER_URL="localhost"


# Start MySQL service
sudo systemctl start mysqld

# Enable MySQL to start on boot
sudo systemctl enable mysqld

# Set MySQL root password
sudo mysql -e "ALTER USER '${MYSQL_USERNAME}'@'${MYSQL_SERVER_URL}' IDENTIFIED BY '${MYSQL_PASSWORD}';"

# Create database named "CSYE"
sudo mysql -u "${MYSQL_USERNAME}" -p"${MYSQL_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};"

