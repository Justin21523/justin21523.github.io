---
title: "MetaCleaner 批次中介資料清理工具"
tagline: "以規則引擎批次清理 Dublin Core 中介資料的桌面工具"
summary: "MetaCleaner 是一款以 C#/.NET 10 與 Avalonia UI 打造的跨平台桌面應用，採 Clean Architecture 分層。核心為可組態的規則引擎，透過條件與動作策略（Trim、空白正規化、日期正規化、正規表達式取代）批次清理 Dublin Core XML 中介資料，並追蹤每個欄位的前後變更。規則集可序列化為 JSON 匯入匯出，並提供視覺化規則建構器。目前 Import 與 Rule Builder 流程可運作，批次／審閱／報表等頁面仍為骨架。"
role: "獨立開發者：架構設計、核心規則引擎、Avalonia MVVM 介面與單元測試"
problem: "圖書館與數位典藏的中介資料常有前後空白、日期格式不一、語言代碼大小寫不一致等髒資料，人工逐筆修正既耗時又易錯，且缺乏可重複套用與審閱的清理流程。"
solution: "建立分層式規則引擎，將清理行為拆成可組合的條件與動作策略物件；以格式抽象層（MetadataDocument / Adapter）支援多種中介資料格式，目前實作 Dublin Core XML（採用禁用 DTD 的安全解析）。規則集以 JSON 描述並驗證，搭配 Avalonia MVVM 介面提供匯入預覽、套用規則與變更檢視。"
outcome: "完成 Import 與 Rule Builder 的垂直切片：可載入範例 Dublin Core XML、套用內建規則集並檢視欄位層級變更；規則 JSON 序列化、驗證與基本編輯皆有單元測試（xUnit，涵蓋 Core／Application／Infrastructure）。"
highlights:
  - "Clean Architecture 四層分離（Core／Application／Infrastructure／App），核心不依賴 UI 與外部技術"
  - "策略模式規則引擎：條件評估器與動作執行器皆可透過 DI 註冊擴充"
  - "四種清理動作：Trim、空白正規化、日期正規化、正規表達式取代，且動作依序套用、後一動作接收前一動作結果"
  - "安全的 XML 解析：禁用 DTD 與外部實體解析以降低匯入外部檔案的攻擊面"
  - "規則集以 JSON 描述、驗證未知 action/condition 型別，支援匯入匯出"
  - "以 CommunityToolkit.Mvvm source generator 實作 MVVM，搭配 Avalonia 編譯式繫結"
challenges:
  - "在不綁定特定檔案格式的前提下設計 MetadataDocument 抽象，以利日後擴充 MARCXML 與 JSON"
  - "規則引擎的錯誤處理策略（繼續／停止當前規則／中止）需兼顧批次穩定性與可追蹤性"
nextSteps:
  - "完成 Batch Run、Review、Reports、Settings 頁面（目前為佔位骨架）"
  - "實作 MARCXML 與 JSON 格式 Adapter，及規劃中的 SQLite 規則集儲存"
---
## 專案概觀

MetaCleaner 是一款以 **C# / .NET 10** 與 **Avalonia UI 12** 打造的跨平台桌面應用程式，目標是為數位典藏與圖書館場景提供可重複、可審閱的中介資料批次清理流程。專案採 **Clean Architecture**，明確切分為 Core（領域模型與規則引擎）、Application（用例與服務）、Infrastructure（XML 解析等外部技術）與 App（Avalonia MVVM 介面）四層。

## 核心設計

清理邏輯的核心是一套**策略模式規則引擎**：引擎本身不知道如何修剪空白或正規化日期，而是將每種行為委派給小型策略物件（如 TrimActionExecutor、NormalizeDateActionExecutor、RegexReplaceActionExecutor），並透過依賴注入註冊。規則由條件（目前為 FieldExists）與依序套用的動作組成，引擎逐欄位執行並產生欄位層級的變更紀錄與處理問題清單，錯誤行為可逐條設定。

## 格式抽象與安全解析

透過 MetadataDocument 與 IMetadataDocumentAdapter 抽象，引擎不需知道底層是 XML、JSON 或 MARCXML。目前實作 **Dublin Core XML** Adapter，使用 System.Xml.Linq 並刻意禁用 DTD 處理與外部資源解析，降低匯入外部檔案的攻擊面。規則集以 System.Text.Json 序列化，並驗證是否使用了未註冊的 action／condition 型別。

## 現況與完成度

目前已完成 **Import** 與 **Rule Builder** 的可運作垂直切片：可載入範例髒 Dublin Core XML、套用內建規則集並檢視前後變更；介面以 CommunityToolkit.Mvvm 的 source generator 搭配 Avalonia 編譯式繫結實作。Batch Run、Review、Reports、Settings 頁面與 MARCXML／JSON 格式、SQLite 儲存目前仍為佔位骨架或規劃中。測試以 xUnit 撰寫，涵蓋 Core、Application 與 Infrastructure 三層的關鍵路徑。專案處於架構清晰、核心可運作的開發中（MVP）階段。
