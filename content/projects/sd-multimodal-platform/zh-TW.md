---
title: "SD Multi-Modal Platform"
tagline: "- 啟用環境：conda activate aienv - 依照 ~/Desktop/datamodelstructure.md： - 模型：/mnt/c/ai..."
summary: "- 啟用環境：conda activate aienv - 依照 ~/Desktop/datamodelstructure.md： - 模型：/mnt/c/aimodels - 快取：/mnt/c/aicache（建議設定 HFHOME/TRANSFORMERSCACHE/TORCHHOME/XDGCACHEHOME）..."
role: "獨立開發者"
problem: "在此描述專案所解決的痛點以及系統實作細節。"
solution: "建立基於 Python, FastAPI 的解決方案。"
highlights:
  - "啟用環境：`conda activate ai_env`"
  - "依照 `~/Desktop/data_model_structure.md`："
  - "模型：`/mnt/c/ai_models`"
  - "快取：`/mnt/c/ai_cache`（建議設定 `HF_HOME`/`TRANSFORMERS_CACHE`/`TORCH_HOME`/`XDG_CACHE_HOME`）"
challenges:
  - "技術挑戰一..."
nextSteps:
  - "下一步計畫一..."
---
- 啟用環境：conda activate aienv - 依照 ~/Desktop/datamodelstructure.md： - 模型：/mnt/c/aimodels - 快取：/mnt/c/aicache（建議設定 HFHOME/TRANSFORMERSCACHE/TORCHHOME/XDGCACHEHOME） - 產出：/mnt/data/training/runs/sd-multimodal-platform/outputs - 設定環境：cp .env.example .env（不要提交 secrets） - 啟動後端：uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 - （可選）啟用非同步佇列（Redis + Celery worker）： - Redis（擇一）：redis-server 或 docker run -p 6379:6379 redis:7-alpine - Worker：celery -A app.workers.celeryworker worker --loglevel=info --queues=generation,postprocess - 啟動前端（React）：cd frontend/react && npm install && VITEAPIBASEURL=http://localhost:8000 npm run dev - API 文件：http://localhost:8000/api/v1/docs（健康檢查：http://localhost:800
