#!/bin/bash
sudo systemctl daemon-reload
sudo systemctl enable csye6225.path
sudo systemctl start csye6225.path
sudo systemctl status csye6225
sudo journalctl -u csye6225