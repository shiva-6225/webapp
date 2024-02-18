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

# Check if password is already set for root user
PASSWORD_SET=$(sudo mysql -u"${MYSQL_USERNAME}" -sse "SELECT COUNT(*) FROM mysql.user WHERE user = '${MYSQL_USERNAME}' AND host = '${MYSQL_SERVER_URL}' AND authentication_string != '';")
if [ "${PASSWORD_SET}" -gt 0 ]; then
  echo "Password is already set for root user."
else
  echo "Setting password for root user..."
  # Set MySQL root password
  sudo mysql -u "${MYSQL_USERNAME}" -e "ALTER USER ${MYSQL_USERNAME}@${MYSQL_SERVER_URL} IDENTIFIED BY '${MYSQL_PASSWORD}';"
  
  # Check if the password was set correctly
  MYSQL_COMMAND="mysql -u${MYSQL_USERNAME} -p${MYSQL_PASSWORD} -e\"SELECT 'Password set successfully'\""
  if eval "${MYSQL_COMMAND}" &> /dev/null; then
    echo "Password for root user set successfully."
  else
    echo "Failed to set password for root user."
  fi
fi

# Set MySQL root password
# sudo mysql -u "${MYSQL_USERNAME}" -e "ALTER USER ${MYSQL_USERNAME}@${MYSQL_SERVER_URL} IDENTIFIED BY '${MYSQL_PASSWORD}';"

# Create database named "CSYE"
sudo mysql -u "${MYSQL_USERNAME}" -p"${MYSQL_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABSE};"

# Install Node and npm
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo apt install -y nodejs

# Install project dependencies
cd ../
npm install





