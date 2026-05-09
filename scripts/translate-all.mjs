import fs from "node:fs";
import path from "node:path";

const projectsPath = path.resolve("data/projects.json");
const outputPath = path.resolve("src/locales/projects-zh.json");

const projects = JSON.parse(fs.readFileSync(projectsPath, "utf8"));

// 1. 精選專案的高品質人工翻譯
const manualTranslations = {
  "threejs-product-viewer": {
    title: "3D 產品展示器 Pro",
    summary: "基於 Three.js 的高效能 3D 產品視覺化平台。支援 360 度旋轉、即時材質更換與互動式光影效果，專為電商與作品集展示設計。"
  },
  "school-library-lms": {
    title: "智慧圖書館管理系統",
    summary: "完整的全端圖書館解決方案。整合書籍追蹤、借閱流程自動化、學生信用評分系統，並提供管理員直覺的數據儀表板。"
  },
  "video-gen-factory": {
    title: "AI 短影音生成工廠",
    summary: "自動化內容生成流水線。利用 LLM 撰寫腳本，串接語音合成 (TTS) 與 Stable Diffusion 圖像生成，一鍵產出高品質短影音。"
  },
  "procedural-3d-maze": {
    title: "程序化 3D 迷宮探險",
    summary: "結合演算法與遊戲設計的 3D 迷宮。使用遞歸回溯算法即時生成地圖，每次遊玩都是獨一無二的體驗，展示了程序化內容生成 (PCG) 的潛力。"
  },
  "3d-rendering-showcase": {
    title: "3D 渲染技術展示室",
    summary: "Web 3D 渲染技術的實驗場。包含 PBR 材質、後期處理效果 (Post-processing)、粒子系統與光線追蹤模擬的互動展示。"
  },
  "ai-dispatch-center": {
    title: "AI 任務調度中心",
    summary: "分散式 AI 任務管理系統。負責協調多個 GPU Worker，智慧分配推理任務，並提供即時的任務狀態監控與日誌分析。"
  },
  "mrt-ubike-analysis": {
    title: "台北捷運與 YouBike 數據分析",
    summary: "城市交通數據視覺化。透過 Python Pandas 分析百萬筆交通數據，揭示捷運站與公共自行車之間的轉乘熱點與人流模式。"
  },
  "traffic-pulse": {
    title: "Traffic Pulse 交通脈動",
    summary: "即時道路監控儀表板。串接交通局 API，視覺化呈現城市道路擁塞指數，幫助使用者避開塞車路段。"
  },
  "tripscore": {
    title: "TripScore 旅遊評分助手",
    summary: "智慧旅遊規劃工具。根據使用者的興趣偏好，利用演算法為旅遊景點打分，自動規劃最佳路線。"
  },
  "fandom-gui-scraper": {
    title: "Fandom Wiki 視覺化爬蟲",
    summary: "無需程式碼的資料擷取工具。提供圖形化介面 (GUI)，讓使用者能輕鬆從 Fandom Wiki 網站爬取角色數據與設定資料。"
  },
  "excel-python-data-analysis": {
    title: "Excel/Python 自動化分析",
    summary: "辦公室自動化腳本合集。利用 Python 批次處理 Excel 報表，自動生成圖表與統計數據，大幅提升工作效率。"
  },
  "charaforge-t2i-lab": {
    title: "CharaForge 角色生成實驗室",
    summary: "專注於動漫角色設計的 AI 生成工具。整合 LoRA 模型訓練與微調流程，讓使用者能精確控制角色的外觀特徵。"
  },
  "anime-adventure-lab": {
    title: "動漫冒險實驗室",
    summary: "結合 AI 敘事與圖像生成的文字冒險遊戲引擎。根據玩家的選擇即時生成劇情分支與對應的插圖。"
  },
  "game-dialogue-simulator": {
    title: "遊戲對話模擬器",
    summary: "RPG 遊戲對話系統的原型設計工具。支援分支劇情編輯、表情差分切換，並可匯出為 JSON 格式供遊戲引擎使用。"
  },
  "discord-clone": {
    title: "Discord 社群平台復刻",
    summary: "即時通訊平台的全端實作。支援即時文字聊天、語音通話、伺服器與頻道管理，還原了 Discord 的核心功能。"
  }
};

// Helper: 根據 Tech Stack 生成通用的中文描述
function generateGenericTranslation(project) {
  const stack = project.stack || [];
  const group = project.group || "web";
  let desc = "";

  if (group === "ai") {
    desc = "這是一個專注於人工智慧與機器學習的專案。";
    if (stack.includes("Python")) desc += " 使用 Python 進行核心邏輯開發。";
    if (stack.includes("Docker")) desc += " 已容器化以便於部署。";
    desc += " 旨在解決特定的資料處理或模型推理問題。";
  } else {
    desc = "這是一個現代化的 Web 應用程式開發專案。";
    if (stack.includes("React") || stack.includes("Vite")) desc += " 前端採用 React 生態系構建，強調互動性與效能。";
    if (stack.includes("Three.js")) desc += " 整合了 3D 圖形技術，提供沉浸式的視覺體驗。";
    else desc += " 包含響應式設計與直覺的使用者介面。";
  }

  return {
    title: project.title, // 標題若無翻譯則維持英文 (通常專案名不需硬翻)
    summary: `[Project] ${desc} (原始描述: ${project.summary.substring(0, 50)}...)`
  };
}

const translations = {};

projects.forEach(p => {
  if (manualTranslations[p.slug]) {
    translations[p.slug] = manualTranslations[p.slug];
  } else {
    translations[p.slug] = generateGenericTranslation(p);
  }
});

fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2));
console.log(`✅ Translation complete! Generated ${Object.keys(translations).length} entries in src/locales/projects-zh.json`);
