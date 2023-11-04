#!/bin/bash

# Navigate to the project directory
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

# Start the application with STDOUT closed
nohup node index.js > /dev/null 2>&1 &