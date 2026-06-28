---
title: "Animation AI Studio：本地優先的模組化 AI 動畫生產管線"
tagline: "把分鏡、影像、語音與生成模型串成一條可重複的短片生產流程"
summary: "一套以本地優先、模組化為核心的 AI 動畫生產管線，聚焦短片與分鏡式工作流。專案以 studio/ 套件重構出型別化的專案、角色與分鏡資料模型，並以 CLI 串接影片生成、語音合成與輸出等子系統。目前處於架構與工作流的雛形階段。"
role: "獨立開發者（架構設計與全端實作）"
problem: "個人化 AI 短片創作牽涉影像生成、影片生成、語音克隆、字幕與後製等大量分散工具，彼此之間缺乏統一的資料模型與流程編排。手動串接這些工具既容易出錯，也難以重複執行同一個專案。如何把這些異質子系統收斂成一條清晰、可追蹤的生產管線，是本專案要解決的核心問題。"
solution: "專案採用保守式重構：新建 studio/ 套件作為面向專案的新架構，用 Pydantic 定義型別化的專案、角色、分鏡、影片、語音與 QC 資料模型，並在 data/projects/<slug>/ 下建立標準化的工作區。CLI（python -m studio.cli.main）負責編排建立專案、註冊角色、定義分鏡、準備渲染任務與執行音訊／影片任務清單。影片層圍繞 LTX-2.3 與 Wan 系列 provider 設計，分成 API、ComfyUI 與本地三條路徑，目前只產生正規化的任務 manifest。既有的 scripts/ 子系統（影像生成、TTS、分析、編輯）刻意保留，由新編排層包覆而非立即重寫；另有 vLLM + FastAPI 的 LLM gateway 與 Vanilla JS + FastAPI 的 Web UI 提供推論與批次監控能力。"
outcome: "目前為雛形階段：專案工作區、角色／分鏡註冊、任務 manifest 準備、FFmpeg 匯出與字幕生成、語音資料集匯出等已可運作；而 Wan 系列推論、自動 I2V 接續、音訊合成對齊與 QC 評分等仍為 scaffold，尚未完整實作。這是一個誠實標示為學習與探索性質的進行中專案。"
highlights:
  - "以 Pydantic 建立型別化的專案／角色／分鏡資料模型"
  - "標準化的 data/projects 工作區與角色、分鏡、LoRA 註冊表"
  - "面向專案的 CLI 編排建立、渲染準備與任務執行"
  - "LTX-2.3 與 Wan2.2 多 provider 影片生成架構（API／ComfyUI／本地）"
  - "對話驅動的 TTS 與來源影片語者分段分析"
  - "per-character 語音克隆與 RVC／歌聲轉換訓練資料集匯出"
challenges:
  - "在不破壞既有 scripts/ 子系統的前提下，用新編排層保守式包覆重構"
  - "為 LTX-2.3 / Wan / ComfyUI 等異質後端設計統一的 provider 介面與正規化 task manifest"
  - "在 16GB VRAM（RTX 5080）一次只能載入單一模型的限制下規劃 LLM gateway 與模型切換"
nextSteps:
  - "完成 Wan 系列推論與自動 I2V 接續的實際執行"
  - "落實音訊合成／對齊與 FFmpeg 合成輸出管線"
  - "實作連續性評分與 QC 執行，並完善 Web UI 端到端流程"
---
## 背景

Animation AI Studio 是一套本地優先（local-first）、模組化的 AI 動畫生產管線，目標是把短片、分鏡式的創作流程系統化。AI 短片創作通常需要拼接大量工具：影像生成、影片生成、語音克隆、字幕與後製，每個工具各有自己的輸入輸出格式，缺乏統一的資料模型與編排。這個專案嘗試把這些異質子系統收斂成一條清晰、可重複執行的管線。

## 架構

專案採取保守式重構策略，分為兩層。新的 `studio/` 套件是面向專案的核心架構，內含 `core`（共用結果模型、路徑、儲存）、`story`（專案與分鏡 schema）、`assets`（角色與 LoRA 註冊）、`video`／`audio`（任務模型與 provider 介面）、`editing`、`evaluation`、`pipelines` 與 `cli`。既有的 `scripts/` 子系統（生成、合成、分析、編輯、編排、訓練）刻意保留，由新編排層包覆而非立即取代，讓重構風險可控。

所有領域物件都以 Pydantic 型別化定義（如 `ShotSpec`、`ShotCharacterBinding`），專案資料則以標準化的 `data/projects/<slug>/` 工作區落地，包含 project.yaml、characters、shots、assets/loras、audio、renders 與 exports 等目錄。

## 技術細節

影片生成層圍繞 LTX-2.3 與 Wan 系列重新設計，拆成 `ltx23_api`、`ltx23_comfy`、`ltx23_local` 三條路徑，並以正規化的 task manifest 作為統一輸出；ComfyUI 路徑透過帶有 `__PROMPT__`、`__IMAGE_URI__` 等佔位符的工作流範本注入參數。語音子系統涵蓋 Whisper 語者分段、對話驅動 TTS、per-character 語音資料集匯出，以及通往 RVC、Seed-VC、Demucs、DiffSinger／OpenUtau 的歌聲轉換路線圖。此外還有以 vLLM + FastAPI 打造、針對 RTX 5080 16GB 最佳化的 LLM gateway（一次僅載入單一模型），以及 Vanilla JS + FastAPI + SSE 的 Web UI 來提交與監控批次任務。技術棧涵蓋 PyTorch 2.7 / CUDA 12.8、Diffusers、Transformers、ControlNet、InsightFace、FAISS／ChromaDB、moviepy／OpenCV／FFmpeg 等。

## 學到什麼

這個專案最大的收穫在於「先把資料模型與介面定義清楚，再談實作」：用型別化 schema 與 provider 介面把異質工具抽象化，讓編排層得以在不重寫舊程式的情況下逐步演進。它也是一個誠實的學習型雛形——README 明確區分「已實作」與「僅 scaffold」，避免誇大未完成的能力，這種對工程邊界的誠實標示本身就是重要的實務練習。
