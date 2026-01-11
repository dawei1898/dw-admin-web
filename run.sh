#!/bin/sh

# 运行容器
docker run -p 5175:80  -e "TZ=Asia/Shanghai" --name dw-admin-web  dw-admin-web:1.0.0
