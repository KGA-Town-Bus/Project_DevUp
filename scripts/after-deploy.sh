#!/bin/bash

REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

npm install

source .env
echo "FRONTEND_SERVER_PORT: $FRONTEND_SERVER_PORT"
echo "BACKEND_SERVER_PORT: $BACKEND_SERVER_PORT"

PID_FRONTEND=$(lsof -t -i:$FRONTEND_SERVER_PORT)
PID_BACKEND=$(lsof -t -i:$BACKEND_SERVER_PORT)

if [ $PID_FRONTEND -gt 0 ]; then
    echo "포트 $FRONTEND_SERVER_PORT를 사용하는 프론트엔드 프로세스를 종료합니다 (PID: $PID_FRONTEND)"
    kill -9 $PID_FRONTEND
else
    echo "포트 $FRONTEND_SERVER_PORT를 사용하는 프론트엔드 프로세스가 없습니다."
fi

if [ $PID_BACKEND -gt 0 ]; then
    echo "포트 $BACKEND_SERVER_PORT를 사용하는 백엔드 프로세스를 종료합니다 (PID: $PID_BACKEND)"
    kill -9 $PID_BACKEND
else
    echo "포트 $BACKEND_SERVER_PORT를 사용하는 백엔드 프로세스가 없습니다."
fi