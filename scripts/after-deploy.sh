#!/bin/bash

# Navigate to the project directory
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

# Install dependencies
npm install


# .env
source .env
echo "SERVER_PORT: $SERVER_PORT"

# 해당 포트를 사용하는 프로세스의 PID를 찾음
PID=$(lsof -t -i:$SERVER_PORT)

# PID가 0보다 큰지 확인하여 해당 포트를 사용하는 프로세스가 존재하는지 확인
if [ $PID -gt 0 ]; then
    # 프로세스가 존재하면 종료
    echo "포트 $PORT를 사용하는 프로세스를 종료합니다 (PID: $PID)"
    kill -9 $PID
else
    echo "포트 $PORT를 사용하는 프로세스가 없습니다."
fi