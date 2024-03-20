#!/bin/bash

# Install Ops Agent
echo 'Installing Ops Agent...'
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
echo 'Ops Agent installation completed.'
cd /
sudo mkdir -p /var/log/webapp/
sudo touch /var/log/webapp/test.log
sudo chmod -R go+r /var/log/webapp/
