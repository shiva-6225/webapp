#!/bin/bash
set -e

# Update package repos
sudo yum update -y

# Install Node and npm
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
