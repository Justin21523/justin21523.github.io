---
title: "GAN-AE 視覺工具套件"
tagline: "GAN 與自動編碼器的影像生成訓練、取樣與評估全流程工具套件"
summary: "一套以 PyTorch 為核心的生成模型研究工具套件，整合 GAN（DCGAN／WGAN-GP／ResNet-SNGAN）與自動編碼器（AE／VAE）的訓練、取樣與評估流程。內含 YAML 設定驅動的訓練腳本、FID／KID／PSNR／SSIM 指標、FastAPI 推論服務與 React 前端控制台，可載入 checkpoint 並產生樣本網格。屬學習與實驗性質的原型專案，尚未正式部署。"
role: "獨立開發者：負責模型實作、訓練／評估流程、後端 API 與前端 UI 的整體設計。"
problem: "生成模型的實驗常分散在零散的 notebook 與腳本中，難以重現、比較與操作；不同解析度與資料集的訓練設定也缺乏統一的管理方式。"
solution: "以 config-first 思維把 GAN 與 AE/VAE 的模型、損失、指標、資料載入抽象成模組化套件，所有超參數集中於 YAML；提供 CLI 訓練／取樣／評估腳本，並以 FastAPI 暴露載入 checkpoint 與產生樣本網格的端點，搭配 React + Vite 控制台與 Gradio 介面操作。"
outcome: "完成可運作的最小推論 API 與前端，支援多種 GAN 架構（DCGAN、WGAN-GP、ResNet-SNGAN）與 AE／VAE 訓練，並具備 FID／KID／PSNR／SSIM 評估、EMA、DiffAugment 等訓練技巧；附 pytest 測試與 Docker（靜態頁）配置。仍為原型，部分進階腳本為佔位待補。"
highlights:
  - "多種 GAN 架構：DCGAN、WGAN-GP（gradient penalty）、ResNet 版 SNGAN（spectral norm + GroupNorm），輸出 tanh [-1,1] 影像"
  - "完整 AE/VAE 系列：卷積 AE、ConvAE、固定式 VAE 與可配置 ConvVAE，含 reparameterization 與 KL 損失"
  - "評估與穩定化技巧：torchmetrics FID／KID、PSNR／SSIM、生成器 EMA、DiffAugment 可微分增強"
  - "Config-first 設計：以 YAML 統一管理資料集（MNIST／CelebA／Anime Faces）與訓練超參，並具 key 相容層"
  - "FastAPI 後端 + React/Vite 控制台 + Gradio 介面：可載入 checkpoint、設定 seed／數量並產生樣本網格"
  - "本地工作流：in-memory job manager 以 subprocess 跑訓練、runs 掃描 meta/metrics、檔案瀏覽與設定編輯"
challenges:
  - "在 torch／torchvision 版本不一致的環境中保持可用：採延遲匯入並以純 torch 自製 make_grid、FID/KID 缺套件時降級為 no-op"
  - "高解析度（256／512px）訓練在 16GB VRAM 下的記憶體與穩定性：以 GroupNorm、混合精度、batch size 調校與 R1／DiffAugment 緩解"
nextSteps:
  - "補齊目前為佔位的進階腳本（模型壓縮／剪枝／量化、線上學習、公平性報告）與對應測試"
  - "實際容器化部署推論服務（目前 Docker 僅供靜態作品頁，DEPLOYMENT 標示尚未部署）"
  - "擴充訓練器抽象（trainers.py 仍為 placeholder）與導入 Celery／Redis 工作佇列以支援多工排程"
---
## 專案概述

GAN-AE 視覺工具套件是一個以 PyTorch 為核心的生成模型研究與工程整合專案，目標是把分散的生成對抗網路（GAN）與自動編碼器（AE／VAE）實驗，收斂成一套模組化、可重現、可操作的工具鏈。整個 `src/` 套件涵蓋模型、損失、指標、資料載入與 API／UI 入口。

## 模型與訓練

模型面提供多種 GAN 架構：DCGAN 風格的生成器與判別器、WGAN-GP（含 gradient penalty 與 n_critic 設定），以及更強的 ResNet 版 SNGAN（spectral norm 搭配 GroupNorm，適合小批量的高解析度訓練）。自動編碼器面則有卷積 AE、ConvAE 與兩種 VAE（固定式與可配置），實作 reparameterization 與 KL 損失。訓練流程內建生成器 EMA、DiffAugment 可微分增強與 hinge／BCE／WGAN-GP 等損失。

## 評估與資料

評估面以 torchmetrics 計算 FID／KID，並提供 PSNR／SSIM 與 LPIPS 等影像品質指標；資料面以 YAML 設定驅動，支援 MNIST、CelebA 與多種 Anime Faces 資料集（含 CC0 demo 與 HQ 512），並有資料品質檢查與切分清單以利重現。

## 服務與介面

後端以 FastAPI 暴露最小可用端點（載入 checkpoint、產生樣本網格），搭配 React 19 + Vite 控制台（Sampler、Train GAN／AE、Data Tools、Eval、Runs、Configs 等分頁）與 Gradio 介面；本地以 in-memory job manager 透過 subprocess 執行訓練任務並掃描 run 結果。

## 現況

本專案目前為學習與實驗性質的原型：核心推論／取樣可運作並附 pytest 測試，但部分進階腳本（壓縮、線上學習、公平性報告）仍為佔位，且推論服務尚未正式容器化部署。
