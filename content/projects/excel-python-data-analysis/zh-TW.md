---
title: "Excel Python Data Analysis Platform"
tagline: "可放作品集展示的 Excel-to-Python 分析平台，涵蓋 profiling、清理、商業分析、dashboard 與 Excel 報表自動化。"
summary: "我把這個專案從 week-based learning repository 重構成模組化 Python 分析平台。現在它可以展示 Excel/CSV 匯入、pandas 清理流程、零售商業分析、Streamlit dashboard、openpyxl workbook automation、CLI workflow，以及 Playwright 錄影與截圖證據。"
role: "獨立 Python Data Analyst / Pandas Engineer / Excel Automation Developer"
problem: "原本 repo 有很多學習筆記、notebooks 與週次練習，但作品集訪客很難看出它是否能變成真正可操作的資料分析產品。這次重構的目標，是把 Excel 商業資料處理成完整、可測試、可展示的 Python 分析流程。"
solution: "我重新整理成以 `src/excel_analysis` 為核心的 application structure，建立 IO、profiling、cleaning、analytics、reporting 與 dashboard 模組。Demo 使用 synthetic retail workbooks，完整走過資料品質檢查、清理、銷售/客戶/商品分析、Excel report export 與 openpyxl feature showcase。"
outcome: "專案現在可以作為完整 Excel Python Data Analysis Platform 展示：包含 Streamlit UI、CLI demo command、sample workbooks、格式化 Excel reports、截圖、影片、GIF、unit tests 與 Playwright E2E evidence。"
highlights:
  - "建立 reusable pandas modules，支援 data profiling、quality checks、cleaning、RFM、cohort、ABC inventory、market basket analysis 與 KPI summary。"
  - "使用 openpyxl 實作 formulas、named styles、comments、hyperlinks、data validation、protection、conditional formatting、charts、metadata 與 formatted reports。"
  - "完成 Streamlit multipage dashboard，包含 guided demo flow、upload/profile、cleaning workbench、business analytics、openpyxl showcase 與 report export。"
  - "補上 pytest 測試、Playwright E2E 錄影、screenshots、trace output 與一鍵 CLI demo command。"
challenges:
  - "把分散的 notebooks 與週次練習轉換成可維護的 package，同時保留能說明學習成果的脈絡。"
  - "避免把分析邏輯寫死在 Streamlit 頁面裡，改成可被 CLI、tests、dashboard 重複呼叫的 Python modules。"
  - "設計足夠真實的 retail sample workbooks，支撐 RFM、cohort、inventory 與 market basket 分析，又不依賴私人資料。"
nextSteps:
  - "補上正式 hosted Streamlit deployment 或 containerized demo environment。"
  - "擴充 PDF/HTML report output 與更多 workbook business scenarios。"
  - "針對大型 Excel / CSV 加入更完整的 performance tests。"
---
這個專案展示的是：我不只是會寫 pandas 範例，而是能把 Excel 商業資料整理成完整 Python 分析產品。平台從 multi-sheet Excel 或 CSV input 開始，進行資料概要分析、品質問題偵測、清理規則套用、零售商業分析，最後匯出格式化 Excel 報表。

核心價值在於工程架構。Streamlit 只是介面，真正的資料分析邏輯放在 `src/excel_analysis` 裡，因此同一套功能可以被 unit test、CLI、dashboard 重複使用。展示素材包含 sample workbooks、自動產生的 Excel report、openpyxl showcase workbook、screenshots、MP4 walkthrough 與 GIF summary。

商業分析層聚焦在電商 / 零售情境：revenue trend、order volume、average order value、category/region performance、customer segmentation、cohort retention、CLV-style summary、ABC inventory classification、slow-moving inventory、reorder suggestions 與 market basket rules。

Excel automation 也被明確展示出來。openpyxl showcase 會產出一份 workbook，示範 formulas、named styles、comments、hyperlinks、data validation、sheet protection、conditional formatting、charts、freeze panes、filters、workbook metadata 與 report styling。這讓它同時是資料分析作品，也是一個 Excel automation case study。

我也補上可靠性證據。repo 包含 IO、cleaning、analytics、sample generation、CLI behavior、UI design constraints 與 workbook formatting 測試。Playwright 會走完整 demo flow、截圖、錄影並產出 trace artifacts，讓 dashboard 不是只有靜態截圖，而是可以被自動驗收的互動產品。
