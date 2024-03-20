#!/bin/bash
sudo -i
cd ..
cd ..
cd ..
sudo mv /tmp/config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo groupadd -r csye6225 || true
sudo useradd -r -g csye6225 -s /usr/sbin/nologin csye6225 || true
sudo chown -R csye6225:csye6225 /etc/google-cloud-ops-agent/config.yaml
sudo chmod 600 /etc/google-cloud-ops-agent/config.yaml


# sudo mkdir -p /etc/google/auth
# sudo mv /tmp/monitor-account-key.json /etc/google/auth/application_default_credentials.json
# sudo chown root:root /etc/google/auth/application_default_credentials.json
# sudo chmod 0400 /etc/google/auth/application_default_credentials.json
# echo 'DefaultEnvironment=\"GOOGLE_APPLICATION_CREDENTIALS=/etc/google/auth/application_default_credentials.json\"' | sudo tee -a /etc/systemd/system.conf
# sudo systemctl daemon-reload

echo 'Restarting Ops Agent to apply new configuration...'
sudo systemctl status google-cloud-ops-agent
sudo systemctl restart google-cloud-ops-agent
echo 'Ops Agent is now monitoring application logs.'