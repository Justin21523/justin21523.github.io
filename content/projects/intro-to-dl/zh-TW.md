---
title: "Deep Learning 系統化實戰教程"
tagline: "從基礎到 LLM 與生成式 AI 的個人深度學習實作筆記集"
summary: "整合台大李宏毅 ML/GenAI 課程內容，建構橫跨 15 個模組、近 40 本 Jupyter notebook 的系統化深度學習學習專案。涵蓋 CNN、Transformer、BERT、LLM 微調、RAG、AI Agent、Diffusion、RLHF 至模型壓縮等主幹技術，並針對 RTX 5080 16GB 環境最佳化。"
role: "獨立學習者與內容作者（規劃學習地圖、實作 notebook、整理論文與範例）"
problem: "現代深度學習技術龐雜且更新快速，缺乏一條從數學基礎、經典模型到最新 LLM／生成式 AI 的清晰學習路徑，零散教材也難以在有限 GPU 上實際動手練習。"
solution: "依模型家族建立 15 個主題模組（基礎、監督學習、CV、序列建模、語言模型、生成模型、圖學習、魯棒性、遷移、強化學習、AI Agent、LLM 進階、多模態等），對應李宏毅課程作業與核心論文，逐一以 PyTorch 實作，並提供環境配置、學習順序與 VRAM 需求指引。"
outcome: "完成涵蓋從 MLP、ResNet、Transformer 到 LoRA 微調、RAG、Diffusion、RLHF、知識編輯與模型合併的近 40 本可執行 notebook，形成可重複使用的個人學習與教學資源，仍持續擴充新模組。"
highlights:
  - "15 個模組、近 40 本 notebook，系統涵蓋現代深度學習主幹技術"
  - "對接李宏毅 ML 2021/2025、GenAI 2025 課程作業與經典論文出處"
  - "含 LLM 微調 (LoRA/QLoRA)、RAG、AI Agent、模型編輯與合併等 2025 前沿主題"
  - "針對 RTX 5080 16GB 最佳化：混合精度、梯度累積、4-bit 量化"
  - "提供初學者／進階／LLM 專題等多條建議學習路線"
  - "涵蓋 XAI、對抗攻擊、LLM 安全等魯棒性與安全議題"
challenges:
  - "在 16GB VRAM 限制下實作 LLM 微調與 Diffusion 等大模型任務，需量化與梯度累積等技巧"
  - "整合多年度、多課程作業並補齊論文脈絡，維持模組間概念連貫"
nextSteps:
  - "補齊尚在規劃的模組並統一新舊 notebook 目錄結構"
  - "將教程內容打包並透過 Docker 部署為線上可瀏覽版本"
  - "持續追蹤新的 LLM／多模態技術並新增對應實作"
---
這是一個以自學為目的的深度學習系統化教學專案，目標是「把現代深度學習整棟大樓走一遍」並以 PyTorch 親手實作。專案整合台大李宏毅老師的 ML 2021、ML 2025 與 GenAI-ML 2025 課程內容，將龐雜的技術整理成清晰的學習地圖與模組化的 Jupyter notebook 集。

內容依模型家族劃分為 15 個模組，從 Foundations（數學、PyTorch 基礎）出發，經監督學習、電腦視覺（CNN）、序列建模（RNN/LSTM、Attention、Transformer）、語言模型（BERT、LLM 微調、推理），延伸至生成模型（Autoencoder/VAE、GAN、Diffusion）、圖學習（GNN）、魯棒性與安全（XAI、對抗攻擊、LLM Safety）、遷移與適應、強化學習（Policy Gradient、RLHF/DPO），再到 AI Agent（RAG、ReAct、Tool Use）、LLM 進階（模型編輯、模型合併）與多模態（語音生成）。每個 notebook 皆標註對應課程作業與核心論文出處。

專案在工程面針對 32 核心 CPU + RTX 5080 16GB VRAM 的環境最佳化，採用 CUDA、混合精度訓練、torch.compile、4-bit 量化（QLoRA）與梯度累積等技巧，使大型模型任務能在消費級 GPU 上實際運行，並提供各 notebook 的 VRAM 需求參考。

專案同時規劃了初學者、進階與 LLM 專題等多條學習路線，方便依興趣與程度循序漸進。此為持續演進中的個人學習與教學資源，部分新模組仍在補充，並計畫以 Docker 打包後部署為可線上瀏覽的版本。
