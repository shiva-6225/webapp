#!/bin/bash
sudo -i
cd ..
cd ..
cd ..
sudo mv /tmp/ops-agent-config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo groupadd -r csye6225 || true
sudo useradd -r -g csye6225 -s /usr/sbin/nologin csye6225 || true
sudo chown -R csye6225:csye6225 /etc/google-cloud-ops-agent/config.yaml
sudo chmod 600 /etc/google-cloud-ops-agent/config.yaml
echo 'Restarting Ops Agent to apply new configuration...'
sudo systemctl restart google-cloud-ops-agent.target
echo 'Ops Agent is now monitoring application logs.'