---
title: "Intro to VML：視覺機器學習入門教材"
tagline: "從數學基礎到 CNN 的純手刻視覺機器學習教學專案"
summary: "一套循序漸進的視覺機器學習教學專案，以 Jupyter notebook 從零實作核心演算法：涵蓋數學基礎、影像處理、邊緣與分割、特徵擷取、傳統機器學習、CNN 與進階架構，並搭配效能最佳化單元與一個 NumPy/PyTorch 訓練 CLI。注重原理理解而非直接呼叫高階 API。"
role: "獨立開發者／教材作者（個人學習型專案）"
problem: "多數深度學習教學直接呼叫高階框架 API，學習者難以真正理解卷積、反向傳播、特徵描述子等底層運作原理，缺乏一條從數學基礎到完整 CNN 的連貫學習路徑。"
solution: "以八個模組（m0–m7）的 Jupyter notebook 由淺入深、主要用 NumPy 從零手刻演算法：m0 數學基礎、m1 基礎影像處理（卷積、濾波、直方圖、幾何變換）、m2 邊緣與分割（Otsu、Canny）、m3 特徵（Harris、SIFT、HOG）、m4 傳統機器學習、m5 CNN（反向傳播、Conv2D、池化、LeNet）、m6 進階架構（BatchNorm、ResNet block、U-Net）、m7 效能（向量化、im2col、多行程）。並提供 vml 套件與 CLI 封裝資料集索引、訓練、推論與誤差分析，搭配 pytest 測試與 Docker 部署模板。"
outcome: "建立了涵蓋約 35 個 notebook、橫跨數學到深度學習的完整自學教材骨架，並附帶可執行的訓練／推論 CLI 與測試。專案目前仍在開發中、尚未正式部署（部署檔為模板）。"
highlights:
  - "八模組漸進式課綱（m0 數學 → m7 效能），約 35 個 notebook 串成完整學習路徑"
  - "核心演算法以 NumPy 從零手刻：卷積、反向傳播、SIFT、HOG、GMM-EM、im2col 等"
  - "經典架構復現：LeNet、ResNet block、U-Net（含 forward／backward）"
  - "附 vml Python 套件與 CLI：資料集索引、MLP／Softmax／CNN 訓練、推論與誤差分析"
  - "以 pytest 為訓練與推論流程建立單元測試"
  - "提供 Docker 與 Nginx 部署模板，預留作品集網站上線路徑"
challenges:
  - "不依賴高階 API、純手刻演算法時需自行推導並驗證梯度與數值正確性"
  - "在教學清晰度與效能之間取捨，後續以向量化與 im2col 補強純 Python 的速度瓶頸"
nextSteps:
  - "完成 Docker 化並依 DEPLOYMENT.md 將教材網站正式部署上線"
  - "補齊 README 與各模組說明，擴充涵蓋主題與練習題"
---
## 專案概觀

Intro to VML 是一套**個人學習型**的視覺機器學習入門教材，以 Jupyter notebook 為核心，主張「從零手刻」核心演算法來建立扎實的底層理解，而非直接呼叫高階框架 API。專案以 Python、NumPy 與 PyTorch 為基礎（注：倉庫 README 自述為 Vision-Language Model 教材，但實際 notebook 內容聚焦於基礎視覺與機器學習演算法，本文以實際內容誠實描述）。

## 課程結構

內容依八個模組由淺入深組織：**m0 數學基礎**、**m1 基礎影像處理**（卷積、濾波、直方圖、幾何變換）、**m2 邊緣與分割**（Otsu、Canny）、**m3 特徵**（Harris 角點、SIFT、HOG）、**m4 傳統機器學習**（線性／邏輯／Softmax 迴歸、SVM、K-means、GMM-EM、HOG+SVM 分類器）、**m5 CNN**（反向傳播、全連接層、激活函數、Conv2D、池化、LeNet、最佳化）、**m6 進階架構**（BatchNorm、ResNet block、U-Net）、**m7 效能最佳化**（Python 效能、向量化、im2col、多行程）。

## 工程實作

除了教學 notebook，專案另含一個 `vml` Python 套件與 CLI，封裝資料集索引／切分、MLP／Softmax／CNN 訓練、推論評估與誤差分析等流程，並以 pytest 對訓練與推論模組撰寫單元測試，顯示其不只是教材、也包含可重用的工程程式碼。

## 部署狀態

專案附有 Docker 與 Nginx 部署模板，並規劃將教材以作品集網站形式上線，但依 DEPLOYMENT.md 所述目前**尚未正式部署、仍在開發中**。
