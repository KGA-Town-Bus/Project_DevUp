#!/bin/bash

REPOSITORY=/home/ubuntu/build
cd $REPOSITORY


FRONTEND_SERVER_PORT=3000
BACKEND_SERVER_PORT=4000

PID_FRONTEND=$(lsof -t -i:$FRONTEND_SERVER_PORT)
PID_BACKEND=$(lsof -t -i:$BACKEND_SERVER_PORT)

if [ $PID_FRONTEND -gt 0 ]; then
    echo "포트 $FRONTEND_SERVER_PORT를 사용하는 프론트엔드 프로세스를 종료합니다 (PID: $PID_FRONTEND)"
    kill -9 $PID_FRONTEND
elif [ $PID_BACKEND -gt 0 ]; then
    echo "포트 $BACKEND_SERVER_PORT를 사용하는 백엔드 프로세스를 종료합니다 (PID: $PID_BACKEND)"
    kill -9 $PID_BACKEND
else
    echo "포트 $FRONTEND_SERVER_PORT와 $BACKEND_SERVER_PORT를 사용하는 프로세스가 없습니다."
fi
