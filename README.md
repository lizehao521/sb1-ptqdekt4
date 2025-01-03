# 币安套利程序

## 云服务器部署步骤

1. 将代码上传到服务器：
```bash
scp -r ./* user@your-server:/path/to/deploy
```

2. 设置环境变量：
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，填入你的币安 API 密钥
nano .env
```

3. 运行部署脚本：
```bash
chmod +x deploy.sh
./deploy.sh
```

## 查看日志
```bash
# 查看实时日志
docker-compose logs -f

# 日志文件位置
./logs/combined.log  # 所有日志
./logs/error.log     # 错误日志
```

## 停止程序
```bash
docker-compose down
```

## 更新程序
```bash
git pull
docker-compose up -d --build
```