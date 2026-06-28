---
title: "video-gen：ROCm 影片生成環境治理工作區"
tagline: "盤點與整併 AMD ROCm 影片生成工具鏈 Python 環境的代理工作區"
summary: "一個建立在 OpenClaw 代理框架上的工作區，核心是用 Python 腳本盤點多個 AMD ROCm 虛擬環境的 pip 套件、計算跨環境重疊與冗餘，並輸出整併建議報告 (JSON)。文件中描述的 ComfyUI／LTX-Video／CLIP 影片生成能力屬規劃與外部環境，本倉庫實際只含環境分析工具與紀錄，屬早期原型。"
role: "個人專案，獨立負責腳本開發、環境治理與文件記錄"
problem: "為了在 AMD Radeon AI PRO R9700 上跑影片生成工具鏈，作者維護了 7 個以上彼此重疊的 ROCm 虛擬環境 (video、comfyui、llamacpp、diffusers、lora、ltx23 等)，造成套件重複、磁碟膨脹與維運負擔，缺乏統一盤點與整併依據。"
solution: "撰寫 Python 腳本，逐一啟動各 venv 執行 pip list、彙整套件版本，計算出現頻率與冗餘清單，並依優先度產生整併策略的 JSON 報告；外層以 OpenClaw 代理工作區 (AGENTS/SOUL/MEMORY/heartbeat) 紀錄 GPU 與磁碟狀態、決策與後續步驟。"
outcome: "完成一套可重複執行的環境盤點腳本與一份整併路線圖文件；自述分析指出環境間約有可觀的套件重疊，可作為合併優先序的依據。專案仍屬原型：腳本含未修正的錯誤 (變數名筆誤、全形字元) 會導致執行中斷，且影片生成功能多為規劃敘述而非已實作程式。"
highlights:
  - "以 Python 標準庫 (subprocess/json/pathlib) 自動盤點多個 ROCm 虛擬環境的 pip 套件"
  - "計算跨環境套件重疊率與高頻套件，產出冗餘清單"
  - "依環境優先度自動生成整併策略與 JSON 報告"
  - "建立在 OpenClaw 代理框架上，以 MEMORY/daily note 紀錄 GPU、磁碟與決策"
  - "針對 AMD Radeon AI PRO R9700 (ROCm) 的影片生成工具鏈環境治理場景"
challenges:
  - "實際可執行的程式碼有限，腳本存在會中斷執行的筆誤 (如 package_occurrence 變數名與全形逗號／中文字)，需修正才能跑通"
  - "文件 (MEMORY、reports) 大量描述 ComfyUI／LTX-Video／CLIP 等能力與效能數字，但這些並未在本倉庫實作，需謹慎區分規劃與成果"
  - "跨 venv 透過 source activate 取得套件清單的方式脆弱，依賴各環境路徑正確且可啟動"
nextSteps:
  - "修正腳本中的變數名與全形字元錯誤，使分析能完整執行並驗證輸出"
  - "補上實際的影片生成程式或明確標示為外部環境，讓倉庫內容與文件敘述一致"
  - "將整併建議落實為可重現的環境匯出/重建腳本 (如 requirements 鎖定)"
---
## 專案定位

`video-gen` 表面上是一個影片生成專案，但深讀原始碼後可誠實地說：它實際上是一個建立在 **OpenClaw 代理框架** 上的工作區 (含 `AGENTS.md`、`SOUL.md`、`MEMORY.md`、`HEARTBEAT.md` 與 `memory/` 日誌)，其核心可執行成果是一組 **ROCm 虛擬環境分析腳本**。README 幾乎為空，因此判斷主要依據原始碼與紀錄檔。

## 實際做了什麼

`rocm-environment-analysis.py` 與 `scripts/analyze_rocm_environments.py` 會逐一進入預先設定的 ROCm venv (rocm-video、comfyui、llamacpp、diffusers、lora、ltx23 等)，以 `source activate && pip list` 取得套件清單，計算跨環境的套件重疊與冗餘率，找出高頻套件，再依優先度輸出一份整併策略的 JSON 報告。倉庫內另有一個僅含 pip/setuptools 的 `venv-rocm` 引導環境。

## 規劃 vs. 成果 (誠實區分)

`MEMORY.md` 與 `reports/` 中描述了 LTX-Video、ComfyUI 工作流、CLIP 語意搜尋、影片品質評估與一系列效能數字，但這些功能並未在本倉庫實作——它們是代理產生的規劃／敘事文件，且所指的影片生成能力位於 `~/` 下的外部環境。因此本專案的可驗證範圍僅限環境盤點與整併工具。

## 現況

屬早期原型：兩支腳本內容幾乎相同，且含會導致 `NameError` 的變數筆誤與混入的全形字元，需修正才能完整執行。整體是一個圍繞 AMD Radeon AI PRO R9700 影片生成工具鏈、用來治理多個 ROCm Python 環境的個人化代理工作區。
