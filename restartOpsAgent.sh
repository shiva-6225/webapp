#!/bin/bash
echo 'Restarting Ops Agent to apply new configuration...'
sudo systemctl restart google-cloud-ops-agent.target
echo 'Ops Agent is now monitoring application logs.'