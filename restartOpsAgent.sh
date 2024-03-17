#!/bin/bash
sudo mv /tmp/ops-agent-config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo chown -R csye6225:csye6225 /etc/google-cloud-ops-agent/config.yaml
sudo chmod 600 /etc/google-cloud-ops-agent/config.yaml
echo 'Restarting Ops Agent to apply new configuration...'
sudo systemctl restart google-cloud-ops-agent.target
echo 'Ops Agent is now monitoring application logs.'