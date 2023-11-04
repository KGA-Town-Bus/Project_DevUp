#!/bin/bash

TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

LOG_FILE="/home/ubuntu/build/deployment-log.txt"

echo "Deployment timestamp: $TIMESTAMP" >> $LOG_FILE

exit 0