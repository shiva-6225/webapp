#!/bin/bash
sudo -i
cd ..
cd ..
cd ..
sudo yum install -y unzip
cd /home/packer/ && sudo unzip webapp.zip

cd /home/packer/webapp && sudo npm install


sudo rm -f webapp.zip
sudo chmod -R 755 /home/packer
sudo chown -R csye6225:csye6225 /home/packer
sudo mv /tmp/csye6225.service /etc/systemd/system/csye6225.service
sudo mv /tmp/csye6225.path /etc/systemd/system/csye6225.path

