---
title: "OpenClaw 多模態整合堆疊"
tagline: "在 AMD ROCm 上以 llama.cpp 串接視覺語言模型的本機推論工作區"
summary: "針對 AMD Radeon AI PRO R9700（32GB）的 ROCm／llama.cpp 多模態工作區，串接 Gemma 4 31B 等視覺語言模型，並透過 OpenClaw Gateway 與 Model Control UI 提供圖文推論。重點在診斷 WebChat 多輪對話的影像遺失問題、穩定 VLM 設定，並規劃新增 Qwen 系列 VLM。內容以調查文件、systemd 服務設定與 Bash 自動化腳本為主，屬原型階段。"
role: "獨立開發者／系統整合與技術文件撰寫"
problem: "在本機 GPU 上以 llama.cpp 服務大型視覺語言模型時，WebChat 將影像以 base64 存入對話歷史，單則訊息達 1–2MB，超過 OpenClaw 內建硬編碼的 128KB 上限，第二輪起即被替換為「[chat.history omitted: message too large]」佔位字串，導致多輪影像分析失效。"
solution: "以唯讀稽核釐清四條影像推論路徑與記憶體上限階層，定位 OpenClaw 編譯包中的硬編碼常數；提出 /img skill 改走 Model Control UI 的 /api/image-test 端點以繞過歷史儲存，僅保留文字於歷史。同時用 YAML 模型 profile 管理 Gemma 與 Qwen 切換、CPU 端 mmproj 投影器卸載，並備妥備份與回滾腳本。"
outcome: "確認直接 API、Model Control UI 圖文測試與 CLI 推論三條路徑可正常運作；完成根因分析、VRAM 約 28–30GB 預算估算與跨 profile 驗證計畫。WebChat 修補與 Qwen VLM 下載仍待核准，整體維持可隨時回滾的原型狀態。"
highlights:
  - "完整繪製四條影像推論路徑與多層記憶體上限階層圖"
  - "定位並記錄 OpenClaw 編譯包中無法用設定變更的硬編碼常數（128KB／6MB／1.43MB）"
  - "以 systemd 使用者服務管理 llama-server、Gateway 與 Model Control UI 三服務"
  - "YAML profile 化管理 Gemma 4 31B VLM 與 Qwen3.6 文字／MoE 模型切換"
  - "mmproj 投影器以 --no-mmproj-offload 卸載至 CPU，精算 VRAM 預算"
  - "每項變更皆配備備份與回滾腳本，並設停止看門狗以利長推論測試"
challenges:
  - "影像 base64 體積遠超內建硬編碼歷史上限，且該限制無法由設定調整"
  - "嵌入式 agent 因 bootstrap 檔過大觸發 Gemma tokenizer 的 400 失敗"
nextSteps:
  - "實作 /img skill 並驗證 WebChat 多輪影像對話"
  - "下載並驗證 Qwen2.5-VL-32B 的 mmproj 相容性後新增 VLM profile"
  - "執行跨所有 profile 的驗證測試矩陣"
---
## 概觀
OpenClaw 多模態整合堆疊是一個針對 AMD Radeon AI PRO R9700（32GB HBM）打造的 ROCm／llama.cpp 多模態調查與實作工作區。目標是在本機 GPU 上穩定服務視覺語言模型（VLM），並讓 OpenClaw Gateway 的對話介面能可靠地進行圖文推論。

## 架構
系統由三個 systemd 使用者服務組成：`llama-server`（埠 8080，承載 Gemma 4 31B Q4_K_M 與 mmproj 投影器）、`openclaw-gateway`（埠 18789，對話與歷史管理）以及自製的 `model-control-ui`（埠 18888，模型切換與 /api/image-test 影像測試端點）。LLM 主幹放於 GPU、視覺投影器以 `--no-mmproj-offload` 卸載至 CPU，整體 VRAM 預算約 28–30GB。

## 核心問題與解法
本工作區的核心是一則 `[chat.history omitted: message too large]` 缺陷：WebChat 將影像以 base64 存入歷史，單則約 1–2MB，超過編譯包中硬編碼的 128KB 上限後被替換為佔位字串，使多輪影像分析失效。透過唯讀稽核釐清四條推論路徑後，提出以 `/img` skill 改走繞過歷史的 image-test 端點作為修補方向。

## 內容組成
專案以工程文件為主：架構圖、根因調查、影像管線修補計畫、VLM 穩定指南、Qwen VLM 研究報告與驗證／回滾計畫；搭配 YAML 模型 profile 設定與一系列 Bash 自動化腳本（稽核、備份、測試、回滾）。

## 現況
屬原型階段：直接 API、Model Control UI 與 CLI 三條推論路徑已驗證可用，WebChat 修補與 Qwen VLM 新增仍待核准；所有變更皆遵循「先備份、可回滾、不破壞既有 Gemma 服務」的安全規範。
