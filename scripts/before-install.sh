#!/bin/bash

DIRECTORY=/home/ubuntu/build

if [ -d "$DIRECTORY" ]; then
    rm -rf "$DIRECTORY"
    echo "디렉토리 $DIRECTORY 가 삭제되었습니다."
else
    echo "디렉토리 $DIRECTORY 가 존재하지 않습니다."
fi
