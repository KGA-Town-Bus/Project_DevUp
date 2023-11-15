#!/bin/bash

REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

nohup node index.js > /dev/null 2>&1 &