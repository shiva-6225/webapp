#!/bin/bash
set -e

# Update package repos
sudo yum update -y

# Install MySQL server
sudo yum install -y mysql-server

# Install Node and npm
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
