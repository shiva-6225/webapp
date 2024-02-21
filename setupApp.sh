#!/bin/bash
sudo -i
cd ..
cd ..
cd ..
sudo yum install -y unzip
cd /home/packer/ && sudo unzip webapp.zip

cd /home/packer/webapp && sudo npm install

ENV_FILE="/home/packer/webapp/.env"


sudo tee "$ENV_FILE" > /dev/null <<EOF
DB_NAME=${MYSQL_DATABASE}
DB_USER=${MYSQL_USERNAME}
DB_PASSWORD=${MYSQL_PASSWORD}
DB_HOST=${MYSQL_SERVER_URL}
DB_PORT=${MYSQL_PORT}
EOF


sudo rm -f webapp.zip

sudo groupadd -r csye6225 || true
sudo useradd -r -g csye6225 -s /usr/sbin/nologin csye6225 || true
sudo chmod -R 755 /home/packer/webapp
sudo chown -R csye6225:csye6225 /home/packer/webapp


sudo mv /tmp/csye6225.service /etc/systemd/system/csye6225.service


