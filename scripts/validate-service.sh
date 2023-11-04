#!/bin/bash

# Get the current date and time
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

# Specify the absolute path for the log file
LOG_FILE="/home/ubuntu/build/deployment-log.txt"

# Log the timestamp to the log file
echo "Deployment timestamp: $TIMESTAMP" >> $LOG_FILE

# Exit with success (0) or failure (non-zero) status based on your checks
exit 0