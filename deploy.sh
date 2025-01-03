#!/bin/bash

# 确保脚本在错误时停止
set -e

echo "开始部署币安套利程序..."

# 1. 安装 Docker (如果没有安装)
if ! command -v docker &> /dev/null; then
    echo "正在安装 Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# 2. 安装 Docker Compose (如果没有安装)
if ! command -v docker-compose &> /dev/null; then
    echo "正在安装 Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# 3. 创建日志目录
mkdir -p logs

# 4. 启动应用
echo "启动应用..."
docker-compose up -d --build

echo "部署完成！"
echo "可以通过以下命令查看日志："
echo "docker-compose logs -f"