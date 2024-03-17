#!/bin/bash

# Install Ops Agent
echo 'Installing Ops Agent...'
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
echo 'Ops Agent installation completed.'
