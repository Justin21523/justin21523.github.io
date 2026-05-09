# AI OCR 工具

一個基於 FastAPI 和 Celery 的高效影像轉文字工具，支援多語言 OCR 處理。

## 功能特色

- 🖼️ 支援多種圖片格式 (JPG, PNG, WEBP)
- 🌐 多語言 OCR 支援 (英文、繁體中文、簡體中文等)
- ⚡ 同步與非同步處理模式
- 📊 信心分數與處理時間統計
- 📁 檔案上傳與管理
- 📈 處理歷史記錄

## 系統需求

- Python 3.8+
- Redis 服務器
- Tesseract OCR 引擎
- Node.js (可選，用於前端開發)

## 安裝步驟

### 1. 克隆專案

```bash
git clone <repository-url>
cd ai-ocr-tool
```

### 2. 建立虛擬環境

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate  # Windows
```

### 3. 安裝 Python 依賴

```bash
pip install -r requirements.txt
```

### 4. 安裝系統依賴

#### Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr libtesseract-dev libleptonica-dev pkg-config
```

#### CentOS/RHEL/Fedora:
```bash
sudo dnf install tesseract tesseract-devel leptonica-devel pkgconfig
```

#### macOS:
```bash
brew install tesseract tesseract-lang
```

#### Windows:
從 [Tesseract 官方網站](https://github.com/UB-Mannheim/tesseract/wiki) 下載安裝程式

### 5. 設定環境變數 (可選)

創建 `.env` 檔案：

```env
# 資料庫設定
DATABASE_URL=sqlite:///./ocr_results.db

# Celery 設定
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# OCR 設定
DEFAULT_LANGUAGE=eng+chi_tra
MAX_FILE_SIZE=10485760

# 伺服器設定
SERVER_HOST=0.0.0.0
SERVER_PORT=8005
```

## 啟動服務

### 方法一：使用啟動腳本 (推薦)

```bash
# 啟動所有服務
./start.sh

# 停止所有服務
./stop.sh
```

### 方法二：手動啟動

1. **啟動 Redis 服務器**：
```bash
redis-server
```

2. **啟動 Celery Worker**：
```bash
celery -A backend.celery_app.celery_app worker --loglevel=info
```

3. **啟動 Celery Beat (可選，用於定時任務)**：
```bash
celery -A backend.celery_app.celery_app beat --loglevel=info
```

4. **啟動 FastAPI 伺服器**：
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8005
```

## API 端點

- `GET /` - 主頁面
- `POST /api/upload-image` - 同步上傳圖片進行 OCR
- `POST /api/upload-image-async` - 非同步上傳圖片進行 OCR
- `GET /api/task-status/{task_id}` - 查詢非同步任務狀態
- `GET /api/history` - 獲取處理歷史

## 配置選項

### 環境變數

- `DATABASE_URL`: 資料庫連接字串 (預設: SQLite)
- `CELERY_BROKER_URL`: Celery Broker URL (預設: Redis)
- `CELERY_RESULT_BACKEND`: Celery 結果後端 (預設: Redis)
- `DEFAULT_LANGUAGE`: 預設 OCR 語言 (預設: eng+chi_tra)
- `MAX_FILE_SIZE`: 最大檔案大小 (預設: 10MB)
- `SERVER_HOST`: 伺服器主機 (預設: 0.0.0.0)
- `SERVER_PORT`: 伺服器端口 (預設: 8005)

## 項目結構

```
ai-ocr-tool/
├── backend/
│   ├── main.py              # FastAPI 主應用
│   ├── config.py            # 配置設定
│   ├── database.py          # 數據庫配置
│   ├── models/              # 數據模型
│   ├── schemas/             # Pydantic 模型
│   ├── services/            # 業務邏輯服務
│   ├── utils/               # 工具函數
│   └── celery_app/          # Celery 配置
├── frontend/
│   ├── index.html           # 主頁面
│   ├── css/style.css        # 樣式文件
│   ├── js/main.js           # JavaScript 邏輯
│   └── uploads/             # 上傳文件目錄
├── logs/                    # 日誌文件目錄
├── requirements.txt         # Python 依賴
├── start.sh                 # 啟動腳本
├── stop.sh                  # 停止腳本
└── README.md               # 說明文件
```

## 開發指南

### 運行測試

```bash
# 安裝測試依賴
pip install pytest pytest-asyncio

# 運行測試
pytest tests/
```

### 程式碼格式化

```bash
# 安裝格式化工具
pip install black ruff

# 格式化 Python 代碼
black .
ruff check --fix
```

## 部署到生產環境

### Docker 部署 (推薦)

創建 `Dockerfile`：

```dockerfile
FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    libleptonica-dev \
    pkg-config \
    redis-server \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8005

CMD ["sh", "-c", "./start.sh && tail -f /dev/null"]
```

### 生產環境配置

- 使用 PostgreSQL 替代 SQLite
- 配置外部 Redis 服務器
- 設定反向代理 (Nginx)
- 配置 SSL 證書
- 設定日誌輪替

## 故障排除

### 常見問題

1. **Tesseract 未找到**：
   - 確保已安裝 Tesseract OCR 引擎
   - 檢查 `pytesseract` 是否能訪問 Tesseract

2. **Redis 連接失敗**：
   - 確保 Redis 服務器正在運行
   - 檢查連接 URL 是否正確

3. **Celery Worker 無法啟動**：
   - 檢查是否有循環導入問題
   - 確保所有依賴都已安裝

### 日誌文件

- 應用日誌: `logs/app_YYYYMMDD.log`
- 錯誤日誌: `logs/error_YYYYMMDD.log`

## 技術棧

- **後端**: FastAPI, Celery, Redis
- **資料庫**: SQLAlchemy, SQLite (可擴展至 PostgreSQL)
- **前端**: HTML, CSS, JavaScript
- **OCR 引擎**: Tesseract OCR
- **異步任務**: Celery with Redis backend

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 授權

MIT License