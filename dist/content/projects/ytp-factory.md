# YTP Factory

**AI-Driven YouTube Poop Generation System with Advanced Intelligence**

YTP Factory is a comprehensive, **fully automated** AI system that transforms normal videos into high-quality YouTube Poop (YTP) content using cutting-edge AI technologies: multi-agent reasoning, RAG retrieval, machine learning models, and multimodal generation.

**🤖 100% Automated • 🧠 AI Agents • 📚 RAG Memory • 🎨 Multimodal Generation • 🚀 Production-Ready**

---

## 🌟 Key Features

### Complete AI-Driven System (Phases P0-P8)

**Core Pipeline (P0-P2)** ✅ **97% Complete**
- 6-stage automated pipeline with checkpoint/resume capability
- Multi-provider LLM support (Local/OpenAI/LLMVendor)
- Advanced TTS engines (XTTS, OpenAI TTS)
- 4 YTP style presets with customization
- Robust error handling and structured logging

**AI Agents System (P4)** ✅ **Complete**
- **6 Intelligent Agents** with reasoning and planning capabilities
  - **Orchestrator Agent**: Master coordinator with global strategy
  - **Segment Agent**: Intelligent video segmentation with ML funniness detection
  - **Script Agent**: RAG-powered script generation with style transfer
  - **Audio Agent**: Smart SFX matching and audio mixing
  - **Visual Agent**: Dynamic effect selection and multimodal generation
  - **Quality Agent**: Multi-task quality assessment and iteration
- **Chain-of-Thought (CoT)** reasoning for transparent decisions
- **Deep Think** mode for complex multi-layer analysis
- **Multi-stage Planning** with dependencies and fallbacks
- **Agent Communication Protocol** for inter-agent collaboration

**RAG System (P5)** ✅ **Complete**
- **FAISS Vector Store** with GPU acceleration (IVF indexing)
- **Multi-modal Embeddings** (text, audio, video → unified 768-dim)
- **4-Stage Retrieval Pipeline**:
  1. ANN Search (3x candidates)
  2. Metadata Filtering (2x candidates)
  3. Semantic Reranking (LLM-based)
  4. Diversity Filtering (final top-k)
- **History Indexer** for automatic learning from past outputs
- **Smart Caching** with LRU and fuzzy prompt matching

**Machine Learning Models (P6)** ✅ **Complete**
- **Funniness Detector**: XGBoost with multi-modal features (audio + visual + text)
- **Style Transfer Model**: LoRA fine-tuned GPT-2 for few-shot style adaptation
- **SFX Matcher**: Dual encoder with contrastive learning (text-audio alignment)
- **Quality Scorer**: Multi-task CNN+LSTM (quality + style + humor assessment)

**Multimodal Generation (P7)** ✅ **Complete**
- **Text-to-Image**: Stable Diffusion SDXL 1.0 with YTP-optimized prompts
- **Image-to-Image**: ControlNet (canny/depth/pose/scribble control)
- **Video Generation**: AnimateDiff (text-to-video) + SVD (image-to-video)
- **Consistency Management**: CLIP-based cross-modal verification

**Infrastructure (P8)** ✅ **Complete**
- **GPU Memory Manager**: Intelligent 16GB VRAM optimization with priority-based LRU
- **Performance Monitor**: Execution profiling, bottleneck detection, optimization recommendations
- **Production Deployment**: systemd service, monitoring, backup/recovery
- **AI Warehouse**: 3-disk architecture for optimal storage management

---

## 🚀 Quick Start

### Prerequisites

**Minimum Requirements**:
- Python 3.10+
- FFmpeg
- 8GB RAM, 4-core CPU
- 100GB disk space

**Recommended for Full AI Features**:
- Ubuntu 22.04 LTS
- NVIDIA RTX 5080 (16GB VRAM)
- 64GB RAM, 12-core CPU
- **3-Disk AI Warehouse**: 250GB system + 2TB SSD (/mnt/c) + 4TB HDD (/mnt/data)
- CUDA 12.1+

### Installation

**Option 1: Quick Start (Basic Features)**

```bash
# Clone repository
git clone <repository-url>
cd ytp-factory

# Run automated setup
./setup.sh

# Choose installation type when prompted
```

**Option 2: Production Deployment (Full AI System)**

```bash
# Clone to /opt
sudo git clone <repository-url> /opt/ytp-factory
cd /opt/ytp-factory

# Run production deployment script
sudo bash scripts/deploy.sh

# Follow prompts to:
# - Install all dependencies
# - Download AI models (~50GB)
# - Create systemd service
# - Configure environment
```

See [Deployment Guide](docs/DEPLOY.md) for production setup.

### Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit configuration
nano .env
```

**Quick Setup Examples**:

<details>
<summary><b>Minimal (Testing, No API Keys)</b></summary>

```bash
YTP_LLM_PROVIDER=stub
YTP_TTS_PROVIDER=stub
YTP_WHISPER_MODEL=tiny
YTP_DEVICE=cpu
```
</details>

<details>
<summary><b>Production (Local LLM - FREE, Unlimited)</b></summary>

```bash
# AI Warehouse paths
YTP_MODELS_ROOT=/mnt/c/ai_models
YTP_CACHE_ROOT=/mnt/c/ai_cache
YTP_DATA_ROOT=/mnt/data/datasets/ytp
YTP_OUTPUT_ROOT=/mnt/data/videos/ytp

# Local LLM (DeepSeek-V3, Qwen2.5, etc.)
YTP_LLM_PROVIDER=local
YTP_LOCAL_LLM_API_BASE=http://localhost:8000/v1
YTP_LOCAL_LLM_MODEL=deepseek-chat

# TTS
YTP_TTS_PROVIDER=openai_tts
OPENAI_API_KEY=sk-proj-...

# GPU
YTP_DEVICE=cuda
YTP_GPU_MEMORY_FRACTION=0.9

# Enable AI features
YTP_ENABLE_AGENTS=true
YTP_ENABLE_RAG=true
YTP_ENABLE_ML_MODELS=true
YTP_ENABLE_MULTIMODAL=true
```
</details>

<details>
<summary><b>Cloud-Based (OpenAI GPT + TTS)</b></summary>

```bash
OPENAI_API_KEY=sk-proj-...
YTP_LLM_PROVIDER=openai
YTP_OPENAI_MODEL=gpt-4o-mini
YTP_TTS_PROVIDER=openai_tts
YTP_WHISPER_MODEL=medium
YTP_DEVICE=cuda
```
</details>

See [Configuration Guide](docs/CONFIG.md) for complete reference.

### Run Pipeline

```bash
# Basic usage
python scripts/run_pipeline.py data/raw/your_video.mp4

# With AI agents
python scripts/run_pipeline.py data/raw/your_video.mp4 --enable-agents

# With performance profiling
python scripts/run_pipeline.py data/raw/your_video.mp4 --enable-profiling

# Output: outputs/videos/your_video_ytp_final.mp4
```

---

## 🎯 System Architecture

### Layered Design

```
┌──────────────────────────────────────────────────────────┐
│              Orchestration Layer                         │
│           (Pipeline Coordinator)                         │
└───────────────────────┬──────────────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────────────┐
│                  AI Agents Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Orchestrator │  │   Segment    │  │    Script    │  │
│  │    Agent     │  │    Agent     │  │    Agent     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    Audio     │  │    Visual    │  │   Quality    │  │
│  │    Agent     │  │    Agent     │  │    Agent     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────────────────┬──────────────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────────────┐
│              Intelligence Core                            │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────┐ │
│  │  LLM System    │  │  RAG System    │  │ ML Models  │ │
│  │ Local/OpenAI   │  │ FAISS Vectors  │  │ 4 Models   │ │
│  │ /LLMVendor     │  │ Multi-modal    │  │ XGBoost    │ │
│  └────────────────┘  └────────────────┘  └────────────┘ │
│  ┌────────────────────────────────────────────────────┐  │
│  │         Multimodal Generation                      │  │
│  │  SDXL | ControlNet | AnimateDiff | SVD            │  │
│  └────────────────────────────────────────────────────┘  │
└───────────────────────┬──────────────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────────────┐
│                 Pipeline Layer                            │
│  Stage 1-6 (Core) + ML Enhancement Stages                │
└───────────────────────┬──────────────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────────────┐
│            Infrastructure Layer                           │
│  GPU Manager | Performance | Logging | Checkpoint        │
└──────────────────────────────────────────────────────────┘
```

### AI Agents System

**6 Intelligent Agents with Advanced Reasoning**:

| Agent | Role | Key Capabilities |
|-------|------|------------------|
| **Orchestrator** | Master Coordinator | Global strategy, agent coordination, quality gates |
| **Segment** | Video Analysis | ML-based funniness detection, dynamic segmentation |
| **Script** | Content Generation | RAG-powered remixing, style transfer, context-aware |
| **Audio** | Sound Design | Intelligent SFX matching, multi-source mixing |
| **Visual** | Effects & Generation | Dynamic effects, multimodal content creation |
| **Quality** | Assessment & Iteration | Multi-task evaluation, feedback loops |

**Agent Capabilities**:
- ✅ **Chain-of-Thought Reasoning**: Transparent step-by-step decision making
- ✅ **Deep Think Mode**: Multi-layer recursive analysis (3 levels)
- ✅ **Multi-stage Planning**: Execution plans with dependencies
- ✅ **RAG Integration**: Context from historical successful outputs
- ✅ **Inter-agent Communication**: REQUEST/RESPONSE/BROADCAST protocols

### RAG System Architecture

```
Query Input
    │
    ▼
┌─────────────────────────────────────┐
│  Multi-modal Embedder               │
│  • Text: Sentence-BERT (384-dim)    │
│  • Audio: Wav2Vec2 (768-dim)        │
│  • Video: CLIP (512-dim)            │
│  → Unified 768-dim projection       │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│  FAISS Vector Store (GPU)           │
│  • IVF Index (100 clusters)         │
│  • GPU-accelerated ANN search       │
│  • ~1M vectors capacity             │
└───────────────┬─────────────────────┘
                │
                ▼
┌─────────────────────────────────────┐
│  4-Stage Retrieval Pipeline         │
│  1. ANN Search (3x candidates)      │
│  2. Metadata Filter (2x candidates) │
│  3. Semantic Rerank (LLM/BERT)      │
│  4. Diversity Filter (top-k)        │
└───────────────┬─────────────────────┘
                │
                ▼
        Top-k Results
```

### ML Models

| Model | Architecture | Purpose | Training |
|-------|-------------|---------|----------|
| **Funniness Detector** | XGBoost + Multi-modal Features | Identify interesting/funny segments | Supervised + Weak supervision |
| **Style Transfer** | GPT-2 + LoRA | Few-shot style adaptation (5-20 examples) | LoRA fine-tuning |
| **SFX Matcher** | Dual Encoder + Contrastive Learning | Text-audio semantic alignment | InfoNCE loss |
| **Quality Scorer** | ResNet-18 + LSTM | Multi-task: quality/style/humor | Multi-task learning |

---

## 📁 Project Structure

```
ytp-factory/
├── src/ytp_factory/
│   ├── agents/                    # AI Agents System (P4)
│   │   ├── core/
│   │   │   ├── base_agent.py      # Agent foundation with CoT
│   │   │   └── protocol.py        # Communication protocol
│   │   ├── orchestrator.py        # Master coordinator
│   │   ├── segment_agent.py       # Video analysis
│   │   ├── script_agent.py        # Content generation
│   │   ├── audio_agent.py         # Sound design
│   │   ├── visual_agent.py        # Effects & multimodal
│   │   └── quality_agent.py       # Quality assessment
│   ├── intelligence/              # Intelligence Core
│   │   ├── llm/                   # LLM System (P3)
│   │   │   ├── providers.py       # Local/OpenAI/LLMVendor
│   │   │   ├── router.py          # Intelligent routing
│   │   │   └── cache.py           # Prompt caching
│   │   ├── rag/                   # RAG System (P5)
│   │   │   ├── vector_store.py    # FAISS GPU vectors
│   │   │   ├── embedders.py       # Multi-modal embeddings
│   │   │   ├── retriever.py       # 4-stage retrieval
│   │   │   └── indexer.py         # History indexing
│   │   └── ml/                    # ML Models (P6)
│   │       ├── funniness_detector.py
│   │       ├── style_transfer.py
│   │       ├── sfx_matcher.py
│   │       └── quality_scorer.py
│   ├── multimodal/                # Multimodal Generation (P7)
│   │   ├── text_to_image.py       # SDXL
│   │   ├── image_to_image.py      # ControlNet
│   │   ├── video_generation.py    # AnimateDiff/SVD
│   │   └── consistency.py         # CLIP verification
│   ├── infrastructure/            # Infrastructure (P8)
│   │   ├── gpu_manager.py         # Memory optimization
│   │   └── performance.py         # Profiling & monitoring
│   ├── audio/                     # TTS, transcription, mixing
│   ├── video/                     # Segmentation, composition
│   ├── text/                      # Script generation
│   └── config.py                  # Configuration system
├── scripts/
│   ├── run_pipeline.py            # Main pipeline runner
│   ├── deploy.sh                  # Production deployment
│   ├── test_integration.py        # 9 integration tests
│   └── download_models.py         # Model pre-download
├── tests/                         # Unit & integration tests
├── docs/
│   ├── INSTALL.md                 # Installation guide
│   ├── CONFIG.md                  # Configuration reference
│   ├── DEPLOY.md                  # Production deployment ⭐NEW
│   └── API_GUIDE.md               # Developer guide
├── requirements/
│   ├── base.txt                   # Core dependencies
│   ├── optional.txt               # TTS/LLM APIs
│   ├── gpu.txt                    # CUDA support
│   ├── ml.txt                     # ML models ⭐NEW
│   ├── multimodal.txt             # Diffusion models ⭐NEW
│   └── dev.txt                    # Development tools
└── .env.example                   # Configuration template
```

---

## 🎨 Usage Examples

### Basic Pipeline

```python
from pathlib import Path
from src.ytp_factory.pipeline import run_pipeline

# Simple run with basic features
output = run_pipeline(
    video_path=Path("data/raw/video.mp4"),
    segment_duration=4.0,
    enable_checkpoint=True,
    remix=True,
)
```

### With AI Agents

```python
# Enable AI agents for intelligent automation
output = run_pipeline(
    video_path=Path("data/raw/video.mp4"),
    enable_agents=True,           # Enable 6 intelligent agents
    enable_rag=True,               # Enable RAG retrieval
    enable_ml_models=True,         # Enable ML-based analysis
)
```

### Agent-Driven Workflow

```python
from src.ytp_factory.agents import OrchestratorAgent
from src.ytp_factory.intelligence.llm import LLMRouter
from src.ytp_factory.intelligence.rag import RAGRetriever

# Initialize AI systems
llm_router = LLMRouter(config)
rag_retriever = RAGRetriever(vector_store, embedder)

# Create agents
orchestrator = OrchestratorAgent(llm_router, rag_retriever, agents)

# Let agents coordinate everything automatically
strategy = orchestrator.decide_strategy(video_path)
results = orchestrator.coordinate_agents(strategy)
```

### RAG-Enhanced Generation

```python
from src.ytp_factory.intelligence.rag import RAGRetriever

# Retrieve similar successful scripts
similar_scripts = rag_retriever.retrieve_script(
    original_text="Hello world",
    style="spongebob_meta",
    top_k=5
)

# Use for generation
remixed = generate_with_context(original, similar_scripts)
```

### Multimodal Generation

```python
from src.ytp_factory.multimodal import (
    Text2ImageGenerator,
    VideoGenerator
)

# Generate custom visual
text2img = Text2ImageGenerator()
image = text2img.generate_for_ytp(
    description="explosion effect",
    style="spongebob"
)

# Generate video transition
video_gen = VideoGenerator(mode="animatediff")
frames = video_gen.generate_ytp_transition(
    transition_type="explosion"
)
```

### Performance Monitoring

```python
from src.ytp_factory.infrastructure import PerformanceMonitor

monitor = PerformanceMonitor()

# Measure operations
with monitor.measure("stage_1_transcription"):
    transcribe_audio()

# Get insights
summary = monitor.get_summary()
bottlenecks = monitor.identify_bottlenecks(threshold=0.15)
recommendations = monitor.get_optimization_recommendations()

# Export report
monitor.export_timings("performance_report.json")
```

---

## 🧪 Testing

### Integration Tests

```bash
# Run comprehensive integration tests (9 test suites)
python3 scripts/test_integration.py

# Expected output:
# ✓ Configuration System
# ✓ LLM System
# ✓ AI Agents System
# ✓ RAG System
# ✓ ML Models
# ✓ Multimodal Generation
# ✓ GPU Memory Management
# ✓ Performance Monitoring
# ✓ System Integration
#
# Results: 9/9 tests passed (100%)
```

### Unit Tests

```bash
# Run all unit tests
python3 -m pytest tests/ -v

# With coverage
python3 -m pytest tests/ --cov=src/ytp_factory --cov-report=html

# Test specific modules
python3 -m pytest tests/test_agents.py -v
python3 -m pytest tests/test_rag.py -v
python3 -m pytest tests/test_ml_models.py -v
```

---

## ⚡ Performance

### Benchmarks (5-minute input video)

| Configuration | Transcription | Script Gen | TTS | Multimodal | Total Time |
|--------------|---------------|------------|-----|------------|------------|
| **CPU Only** | 2 min | 30 sec | 4 min | N/A | ~7 min |
| **GPU (16GB)** | 15 sec | 10 sec | 1 min | 2 min | ~4 min |
| **GPU + Agents** | 15 sec | 30 sec* | 1 min | 2 min | ~5 min |
| **Full AI System** | 15 sec | 45 sec* | 1 min | 3 min** | ~6 min |

\* Includes RAG retrieval and agent reasoning
\** Includes multimodal generation when needed

### GPU Memory Usage (16GB VRAM)

| Component | VRAM Usage | Priority |
|-----------|------------|----------|
| Whisper Medium | 1.5 GB | High (keep loaded) |
| Text Embedder | 400 MB | High |
| SDXL | 6 GB | Low (sequential load) |
| ControlNet | 7 GB | Low |
| SVD | 10 GB | Low |
| ML Models | 2 GB total | Medium |

**Intelligent GPU Management**: Models are automatically loaded/unloaded based on priority and available memory.

### Optimization Tips

1. **Use Local LLM** with vLLM for unlimited free inference
2. **Enable FP16** precision for 2x speed, 50% memory
3. **Pre-download models** to avoid first-run delays
4. **Use smaller models** if speed is critical:
   - Whisper: `small` instead of `medium` (-50% time)
   - Video: `animatediff` instead of `svd` (-50% VRAM)
5. **Disable multimodal** if not needed (-5GB VRAM)
6. **Enable xformers** for memory-efficient attention
7. **Use prompt caching** for repeated queries

See [Deployment Guide](docs/DEPLOY.md#performance-tuning) for detailed tuning.

---

## 🛠️ AI Warehouse (3-Disk Architecture)

YTP Factory follows a strict **3-disk storage architecture** for optimal performance:

```
Disk 1: System Disk (250GB SSD)
  └── $HOME - Code and lightweight files only

Disk 2: /mnt/c (2TB SSD - "Cold Storage")
  ├── /mnt/c/ai_models/          # Model weights (~50GB)
  │   ├── funniness_detector/
  │   ├── style_transfer/
  │   ├── sdxl/
  │   ├── controlnet/
  │   └── svd/
  └── /mnt/c/ai_cache/           # Model caches (~30GB)
      ├── huggingface/
      └── torch/

Disk 3: /mnt/data (4TB HDD - "Hot Storage")
  ├── /mnt/data/datasets/        # Training data (~500GB)
  ├── /mnt/data/videos/          # Outputs (~1TB)
  └── /mnt/data/training/rag/    # RAG indices (~100GB)
```

**Why 3 Disks?**
- `/mnt/c` (SSD): Fast loading for frequently-accessed models
- `/mnt/data` (HDD): Large, cheap storage for datasets and outputs
- `$HOME`: Never store large files here (causes system slowdown)

See [Deployment Guide](docs/DEPLOY.md#ai-warehouse-setup) for setup instructions.

---

## 📊 System Monitoring

### Production Monitoring

```bash
# Service status
sudo systemctl status ytp-factory

# Real-time logs
sudo journalctl -u ytp-factory -f

# GPU monitoring
watch -n 1 nvidia-smi

# Performance metrics
python3 scripts/analyze_performance.py outputs/performance.json
```

### Built-in Monitoring

```python
# GPU memory tracking
from src.ytp_factory.infrastructure import GPUMemoryManager

gpu_manager = GPUMemoryManager()
memory_info = gpu_manager.get_memory_info()
print(f"GPU: {memory_info['used_mb']}MB / {memory_info['max_mb']}MB")
print(f"Loaded models: {memory_info['loaded_models']}")

# Performance profiling
from src.ytp_factory.infrastructure import PerformanceMonitor

monitor = get_global_monitor()
monitor.print_report()  # Detailed report with bottlenecks
```

---

## 🎯 Roadmap

### ✅ Completed (v2.0 - Phases P0-P8)

**Phase P0-P2: Foundation** (97% complete)
- ✅ 6-stage pipeline with checkpoint/resume
- ✅ Multi-provider LLM (Local/OpenAI/LLMVendor)
- ✅ XTTS and OpenAI TTS integration
- ✅ 4 YTP style presets
- ✅ Robust error handling
- ✅ 30 unit tests + 8 integration tests
- ✅ Comprehensive documentation

**Phase P3: Open-Source LLM** (100% complete)
- ✅ Local LLM provider (OpenAI-compatible API)
- ✅ LLM Router with intelligent selection
- ✅ Prompt cache with fuzzy matching
- ✅ DeepSeek, Qwen, vLLM support

**Phase P4: AI Agents** (100% complete)
- ✅ 6 intelligent agents with reasoning
- ✅ Chain-of-Thought (CoT) reasoning
- ✅ Deep Think multi-layer analysis
- ✅ Multi-stage planning
- ✅ Agent communication protocol

**Phase P5: RAG System** (100% complete)
- ✅ FAISS GPU-accelerated vector store
- ✅ Multi-modal embeddings (text/audio/video)
- ✅ 4-stage retrieval pipeline
- ✅ History indexer for learning

**Phase P6: ML Models** (100% complete)
- ✅ Funniness Detector (XGBoost + multi-modal)
- ✅ Style Transfer (LoRA fine-tuned GPT-2)
- ✅ SFX Matcher (dual encoder + contrastive)
- ✅ Quality Scorer (multi-task CNN+LSTM)

**Phase P7: Multimodal** (100% complete)
- ✅ Stable Diffusion SDXL 1.0
- ✅ ControlNet (structure-preserving)
- ✅ AnimateDiff + SVD (video generation)
- ✅ CLIP consistency checking

**Phase P8: Production** (100% complete)
- ✅ GPU memory manager (16GB optimization)
- ✅ Performance monitoring
- ✅ Production deployment scripts
- ✅ Comprehensive deployment docs
- ✅ systemd service integration

### 🚧 Future Enhancements (v3.0+)

**Phase P9: Advanced Features**
- [ ] Real-time video processing
- [ ] Live streaming support
- [ ] Collaborative editing (multi-user)
- [ ] Cloud deployment (Docker/Kubernetes)
- [ ] Web UI dashboard

**Phase P10: Advanced ML**
- [ ] Custom model training pipeline
- [ ] Transfer learning from user data
- [ ] Reinforcement learning for quality optimization
- [ ] GAN-based video enhancement
- [ ] Emotion-aware script generation

**Phase P11: Integrations**
- [ ] YouTube upload automation
- [ ] Social media integration (TikTok, Twitter)
- [ ] Content moderation system
- [ ] Copyright detection
- [ ] Monetization tracking

---

## 📚 Documentation

### Core Documentation

- **[Installation Guide](docs/INSTALL.md)** - Setup, dependencies, platform-specific instructions
- **[Configuration Guide](docs/CONFIG.md)** - Environment variables, provider config, optimization
- **[Deployment Guide](docs/DEPLOY.md)** ⭐NEW - Production deployment, AI warehouse, monitoring
- **[API/Developer Guide](docs/API_GUIDE.md)** - Extending pipeline, custom agents, plugins

### Quick Links

- **Getting Started**: [INSTALL.md](docs/INSTALL.md)
- **Production Setup**: [DEPLOY.md](docs/DEPLOY.md)
- **AI Configuration**: [CONFIG.md](docs/CONFIG.md) (sections on Agents, RAG, ML, Multimodal)
- **Development**: [API_GUIDE.md](docs/API_GUIDE.md)

---

## 🏗️ Architecture Highlights

### Design Principles

- **Modularity**: Pluggable providers, agents, and models
- **Intelligence**: AI agents with reasoning and planning
- **Memory**: RAG system for learning from history
- **Resilience**: Checkpoint system + retry mechanism
- **Observability**: Performance monitoring and profiling
- **Scalability**: GPU memory management for large-scale processing
- **Testability**: Stub modes for testing without APIs

### Key Innovations

1. **Multi-Agent Orchestration**: First YTP system with intelligent agent coordination
2. **RAG-Enhanced Generation**: Historical learning for consistent quality
3. **Few-Shot Style Transfer**: 5-20 examples sufficient for new styles
4. **Intelligent GPU Management**: Priority-based LRU for 16GB VRAM optimization
5. **Multi-Modal Intelligence**: Unified embeddings across text/audio/video
6. **Production-Ready**: systemd service, monitoring, backup/recovery

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Write tests for new functionality
4. Ensure all tests pass (`pytest tests/`)
5. Format code with black (`black src/`)
6. Commit with clear messages
7. Submit a pull request

See [API Guide](docs/API_GUIDE.md) for development patterns.

---

## 🆘 Troubleshooting

### Quick Fixes

**GPU Out of Memory**:
```bash
# Reduce GPU memory fraction
YTP_GPU_MEMORY_FRACTION=0.8  # in .env

# Enable sequential loading
YTP_MULTIMODAL_SEQUENTIAL=true

# Use smaller models
YTP_WHISPER_MODEL=small
YTP_VIDEO_MODE=animatediff  # instead of SVD
```

**Service Won't Start**:
```bash
# Check logs
sudo journalctl -u ytp-factory -n 100

# Verify paths
ls -la /mnt/c /mnt/data

# Fix permissions
sudo chown -R $USER /mnt/c /mnt/data
```

**Model Download Fails**:
```bash
# Clear cache
rm -rf /mnt/c/ai_cache/huggingface/hub/*

# Manual download
python3 scripts/download_models.py --all
```

See [Installation Guide](docs/INSTALL.md#troubleshooting) and [Deployment Guide](docs/DEPLOY.md#troubleshooting) for comprehensive solutions.

---

## 💡 System Requirements

### Minimum (Basic Features)

- **CPU**: 4 cores
- **RAM**: 8GB
- **GPU**: None (CPU mode)
- **Disk**: 10GB
- **OS**: Linux, macOS, Windows (WSL2)

### Recommended (Full AI System)

- **CPU**: 12+ cores (Ryzen 9 / i9)
- **RAM**: 64GB
- **GPU**: NVIDIA RTX 5080 (16GB VRAM)
- **Disk**: **3-disk setup** (250GB system + 2TB SSD + 4TB HDD)
- **OS**: Ubuntu 22.04 LTS
- **CUDA**: 12.1+

---

## 🎖️ Credits

### Technologies

**Core Pipeline**:
- [FFmpeg](https://ffmpeg.org/) - Video processing
- [faster-whisper](https://github.com/SYSTRAN/faster-whisper) - Speech transcription
- [Coqui XTTS](https://github.com/coqui-ai/TTS) - Voice cloning
- [moviepy](https://zulko.github.io/moviepy/) - Video editing
- [pydub](https://github.com/jiaaro/pydub) - Audio manipulation

**AI & ML**:
- [Transformers](https://huggingface.co/transformers) - LLMs and embeddings
- [Diffusers](https://github.com/huggingface/diffusers) - Stable Diffusion, ControlNet, SVD
- [FAISS](https://github.com/facebookresearch/faiss) - Vector similarity search
- [CLIP](https://github.com/openai/CLIP) - Multi-modal understanding
- [XGBoost](https://xgboost.readthedocs.io/) - Gradient boosting
- [PyTorch](https://pytorch.org/) - Deep learning framework
- [vLLM](https://github.com/vllm-project/vllm) - Fast LLM inference

**APIs**:
- [OpenAI API](https://platform.openai.com/) - GPT models and TTS
- [LLMVendor API](https://www.llm_vendor.com/) - LLMProvider models
- [DeepSeek](https://www.deepseek.com/) - Open-source LLM
- [Qwen](https://github.com/QwenLM/Qwen) - Open-source LLM

### Inspiration

YouTube Poop culture, AI research community, and the creative remix community.

---

## 📄 License

[Add your license here - MIT, GPL, etc.]

---

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/ytp-factory/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ytp-factory/discussions)

For production deployments, see [DEPLOY.md](docs/DEPLOY.md) for detailed guidance.

---

**🎬 Ready to create AI-powered YTPs? Let's get started!**

```bash
git clone <repository-url>
cd ytp-factory
./setup.sh
python scripts/run_pipeline.py data/raw/your_video.mp4
```

**For production deployment with full AI features**:

```bash
sudo bash scripts/deploy.sh
```

---

**Built with ❤️ using cutting-edge AI technologies**

*YTP Factory v2.0 - Phases P0-P8 Complete (18-week implementation)*
