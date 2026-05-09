# Deep Learning 教程

系統化學習深度學習的實戰教程，整合台大李宏毅老師課程內容：
- [ML 2021 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2021-spring.php) - 機器學習基礎
- [ML 2025 Spring](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php) - 進階 LLM 技術 (NEW)
- [GenAI-ML 2025 Fall](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php) - 生成式 AI (NEW)

## 學習路線圖

```
                    ┌─────────────────┐
                    │   Foundations   │
                    │ (環境/數學/PyTorch) │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
     ┌────────────┐  ┌────────────┐  ┌────────────┐
     │ Supervised │  │  Computer  │  │  Sequence  │
     │  Learning  │  │   Vision   │  │  Modeling  │
     │ (迴歸/分類) │  │   (CNN)    │  │ (RNN/Trans)│
     └──────┬─────┘  └─────┬──────┘  └─────┬──────┘
            │              │               │
            └──────────────┼───────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
     ┌────────────┐  ┌────────────┐  ┌────────────┐
     │  Language  │  │ Generative │  │   Graph    │
     │   Models   │  │   Models   │  │  Learning  │
     │(BERT/LLM)  │  │(VAE/GAN/Diff)│  │   (GNN)    │
     └──────┬─────┘  └─────┬──────┘  └─────┬──────┘
            │              │               │
     ┌──────┴───────┐      │               │
     ▼              ▼      │               │
┌──────────┐  ┌──────────┐ │               │
│AI Agents │  │   LLM    │ │               │
│(RAG/Tool)│  │ Advanced │ │               │
│  [NEW]   │  │  [NEW]   │ │               │
└────┬─────┘  └────┬─────┘ │               │
     │             │       │               │
     └─────────────┼───────┼───────────────┘
                   │       │
        ┌──────────┼───────┼──────────┐
        ▼          ▼       ▼          ▼
┌───────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐
│ Robustness│ │Transfer │ │Reinforce│ │ Multimodal│
│ & Security│ │& Adapt. │ │ Learning│ │   [NEW]   │
│(XAI/Adv.) │ │(Domain) │ │(RL/RLHF)│ │ (Speech)  │
└───────────┘ └─────────┘ └─────────┘ └───────────┘
        │          │           │          │
        └──────────┼───────────┼──────────┘
                   │           │
              ┌────┴───────────┴────┐
              ▼                     ▼
     ┌────────────┐         ┌────────────┐
     │  Advanced  │         │ Deployment │
     │  Learning  │         │& Optimizat.│
     │(Meta/SSL)  │         │(Compress)  │
     └────────────┘         └────────────┘
```

## 模組概覽

### 1. Foundations（基礎）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `environment_setup.ipynb` | 環境配置、GPU 設定 | - |
| `math_essentials.ipynb` | 數學基礎（線代/微積分/統計）| - |
| `pytorch_fundamentals.ipynb` | PyTorch 核心概念 | - |

### 2. Supervised Learning（監督式學習）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `regression.ipynb` | 迴歸分析、COVID-19 預測 | 2021 HW1, 2025F HW5 |
| `classification.ipynb` | 分類、音素識別 | 2021 HW2, 2025F HW6 |
| `mlp_training.ipynb` | MLP 訓練技巧 | - |

### 3. Computer Vision（電腦視覺）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `cnn_fundamentals.ipynb` | CNN 基礎、影像分類 | 2021 HW3, 2025F HW6 |

### 4. Sequence Modeling（序列建模）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `rnn_lstm.ipynb` | RNN/LSTM 基礎 | - |
| `attention_mechanism.ipynb` | Self-Attention、Speaker Recognition | 2021 HW4 |
| `transformer.ipynb` | Transformer 架構、機器翻譯 | 2021 HW5 |
| `transformer_internals.ipynb` | Attention 視覺化、KV Cache、RoPE | 2025S HW3 |
| `transformer_training.ipynb` | 從零訓練 Transformer | 2025S HW4 |

### 5. Language Models（語言模型）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `genai_introduction.ipynb` | GenAI 基礎、LLM 原理 | 2025F HW1, HW3 |
| `bert_applications.ipynb` | BERT 微調、問答系統 | 2021 HW7 |
| `llm_finetuning.ipynb` | LoRA/QLoRA 微調 | 2025S HW5, 2025F HW7 |
| `llm_inference.ipynb` | LLM 推理 | - |

### 6. Generative Models（生成模型）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `autoencoder_vae.ipynb` | Autoencoder、VAE、異常檢測 | 2021 HW8 |
| `gan.ipynb` | GAN 訓練、動漫頭像生成 | 2021 HW6 |
| `diffusion_advanced.ipynb` | DDIM、CFG、Latent Diffusion | 2025S HW10 |
| `diffusion_customization.ipynb` | DreamBooth、LoRA for SD、ControlNet | 2025F HW9 |

### 7. Graph Learning（圖學習）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `gnn_fundamentals.ipynb` | GNN 基礎、節點分類 | - |

### 8. Robustness & Security（魯棒性與安全）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `explainable_ai.ipynb` | Saliency Map、LIME、Grad-CAM | 2021 HW9 |
| `adversarial_attack.ipynb` | FGSM、PGD、對抗防禦 | 2021 HW10 |
| `llm_safety.ipynb` | Jailbreak 防禦、Guardrails | 2025F HW4 |

### 9. Transfer & Adaptation（遷移與適應）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `domain_adaptation.ipynb` | MMD、DANN、Self-Training | 2021 HW11 |
| `catastrophic_forgetting.ipynb` | EWC、Synaptic Intelligence | 2025S HW6, 2025F HW8 |
| `lifelong_learning.ipynb` | Experience Replay、PackNet | 2021 HW14 |

### 10. Reinforcement Learning（強化學習）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `rl_fundamentals.ipynb` | Policy Gradient、Actor-Critic | 2021 HW12 |
| `rlhf_alignment.ipynb` | RLHF、DPO、Reward Model | 2025S HW7 |

### 11. Advanced Learning（進階學習範式）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `meta_learning.ipynb` | MAML、Prototypical Networks | 2021 HW15 |

### 12. Deployment（部署與優化）
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `training_optimization.ipynb` | torch.compile、混合精度 | - |
| `model_compression.ipynb` | 知識蒸餾、剪枝、量化 | 2021 HW13 |

### 13. AI Agents（AI 代理）[NEW]
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `rag_basic.ipynb` | RAG 入門、向量檢索、FAISS | 2025F HW2 |
| `rag_fundamentals.ipynb` | RAG 進階、Reranking、HyDE | 2025S HW1 |
| `agent_tools.ipynb` | ReAct、Tool Use、Multi-Agent | 2025S HW2 |

### 14. LLM Advanced（LLM 進階）[NEW]
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `model_editing.ipynb` | ROME、MEMIT 知識編輯 | 2025S HW8 |
| `model_merging.ipynb` | Task Arithmetic、TIES、mergekit | 2025S HW9 |

### 15. Multimodal（多模態）[NEW]
| Notebook | 主題 | 課程來源 |
|----------|------|----------|
| `speech_generation.ipynb` | TTS、VITS、Bark | 2025F HW10 |

## 快速開始

### 環境需求
- Python 3.8+
- PyTorch 2.0+
- CUDA 11.8+ (推薦)

### 安裝
```bash
# 建立虛擬環境
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或 venv\Scripts\activate  # Windows

# 安裝基礎依賴
pip install torch torchvision torchaudio
pip install numpy pandas matplotlib scikit-learn
pip install jupyter notebook

# LLM 相關
pip install transformers peft accelerate bitsandbytes
pip install sentence-transformers faiss-cpu

# 其他
pip install gymnasium  # RL
pip install torch-geometric  # GNN
```

### 開始學習
```bash
cd notebooks/foundations
jupyter notebook environment_setup.ipynb
```

## 建議學習順序

### 初學者路線（4-6 週）
1. `foundations/` - 環境和基礎
2. `supervised_learning/regression.ipynb` - 迴歸
3. `supervised_learning/classification.ipynb` - 分類
4. `computer_vision/cnn_fundamentals.ipynb` - CNN
5. `sequence_modeling/rnn_lstm.ipynb` - RNN

### 進階路線（2-3 週）
1. `sequence_modeling/attention_mechanism.ipynb` - Attention
2. `sequence_modeling/transformer.ipynb` - Transformer
3. `language_models/bert_applications.ipynb` - BERT
4. `generative_models/` - 生成模型

### LLM 專題路線（2025 新增）
1. `language_models/genai_introduction.ipynb` - GenAI 基礎
2. `ai_agents/rag_basic.ipynb` - RAG 入門
3. `language_models/llm_finetuning.ipynb` - LoRA 微調
4. `ai_agents/agent_tools.ipynb` - AI Agent
5. `reinforcement_learning/rlhf_alignment.ipynb` - RLHF
6. `llm_advanced/model_editing.ipynb` - 模型編輯
7. `llm_advanced/model_merging.ipynb` - 模型合併

### 專題路線（按興趣選擇）
- **NLP 方向**: Attention → Transformer → BERT → LLM → RAG → Agent
- **CV 方向**: CNN → GAN → Diffusion → Explainable AI → Adversarial
- **RL 方向**: 基礎 → Policy Gradient → Actor-Critic → RLHF

## 參考資源

### 李宏毅課程
| 課程 | 年份 | 連結 |
|------|------|------|
| ML 2021 Spring | 2021 | [官網](https://speech.ee.ntu.edu.tw/~hylee/ml/2021-spring.php) / [GitHub](https://github.com/ga642381/ML2021-Spring) |
| ML 2025 Spring | 2025 | [官網](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php) |
| GenAI-ML 2025 Fall | 2025 | [官網](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php) |

### 核心論文
| 領域 | 論文 |
|------|------|
| CNN | ResNet (arXiv:1512.03385) |
| RNN | LSTM (Hochreiter 1997) |
| Transformer | Attention is All You Need (arXiv:1706.03762) |
| BERT | arXiv:1810.04805 |
| GAN | arXiv:1406.2661 |
| VAE | arXiv:1312.6114 |
| Diffusion | DDPM (arXiv:2006.11239) |
| GNN | GCN (arXiv:1609.02907) |
| LoRA | arXiv:2106.09685 |
| RLHF | arXiv:2203.02155 |
| DPO | arXiv:2305.18290 |

## 目錄結構

```
notebooks/
├── foundations/               # 基礎
│   ├── environment_setup.ipynb
│   ├── math_essentials.ipynb
│   └── pytorch_fundamentals.ipynb
├── supervised_learning/       # 監督式學習
│   ├── regression.ipynb
│   ├── classification.ipynb
│   └── mlp_training.ipynb
├── computer_vision/           # 電腦視覺
│   └── cnn_fundamentals.ipynb
├── sequence_modeling/         # 序列建模
│   ├── rnn_lstm.ipynb
│   ├── attention_mechanism.ipynb
│   ├── transformer.ipynb
│   ├── transformer_internals.ipynb    # NEW
│   └── transformer_training.ipynb     # NEW
├── language_models/           # 語言模型
│   ├── genai_introduction.ipynb       # NEW
│   ├── bert_applications.ipynb
│   ├── llm_finetuning.ipynb           # NEW
│   └── llm_inference.ipynb
├── generative_models/         # 生成模型
│   ├── autoencoder_vae.ipynb
│   ├── gan.ipynb
│   ├── diffusion_advanced.ipynb       # NEW
│   └── diffusion_customization.ipynb  # NEW
├── graph_learning/            # 圖學習
│   └── gnn_fundamentals.ipynb
├── robustness_security/       # 魯棒性與安全
│   ├── explainable_ai.ipynb
│   ├── adversarial_attack.ipynb
│   └── llm_safety.ipynb               # NEW
├── transfer_adaptation/       # 遷移與適應
│   ├── domain_adaptation.ipynb
│   ├── catastrophic_forgetting.ipynb  # NEW
│   └── lifelong_learning.ipynb
├── reinforcement_learning/    # 強化學習
│   ├── rl_fundamentals.ipynb
│   └── rlhf_alignment.ipynb           # NEW
├── advanced_learning/         # 進階學習
│   └── meta_learning.ipynb
├── deployment/                # 部署優化
│   ├── training_optimization.ipynb
│   └── model_compression.ipynb
├── ai_agents/                 # AI 代理 [NEW]
│   ├── rag_basic.ipynb
│   ├── rag_fundamentals.ipynb
│   └── agent_tools.ipynb
├── llm_advanced/              # LLM 進階 [NEW]
│   ├── model_editing.ipynb
│   └── model_merging.ipynb
└── multimodal/                # 多模態 [NEW]
    └── speech_generation.ipynb
```

## 硬體建議

本教程針對以下配置優化：
- **CPU**: 32 核心+
- **GPU**: NVIDIA RTX 5080 16GB VRAM (或同等)
- **記憶體**: 32GB+

### VRAM 需求參考
| Notebook | 模型 | VRAM |
|----------|------|------|
| genai_introduction | GPT-2 / Phi-2 | 2-4 GB |
| rag_* | sentence-transformers | 1-2 GB |
| llm_finetuning | Phi-2 + QLoRA | 8-12 GB |
| rlhf_alignment | GPT-2 | 4-8 GB |
| diffusion_* | SD 1.5 (fp16) | 8-12 GB |
| speech_generation | Bark-small | 4-8 GB |

對於較小的 GPU，可以：
- 減少 batch size
- 使用梯度累積
- 使用混合精度訓練
- 使用 4-bit 量化 (QLoRA)

## License

MIT License
