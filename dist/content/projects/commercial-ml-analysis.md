# Commercial ML Analysis Platform

A production-grade **Traditional ML** e-commerce analytics and prediction system built for large-scale Amazon dataset analysis (tens of GB). Features CPU-optimized feature engineering, model training with hyperparameter optimization, drift monitoring, continuous training pipelines, and interactive dashboards.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Data Preparation](#-data-preparation)
- [Usage](#-usage)
  - [ETL Pipeline](#etl-pipeline)
  - [Feature Engineering](#feature-engineering)
  - [Model Training](#model-training)
  - [Drift Monitoring](#drift-monitoring)
  - [Continuous Training](#continuous-training)
  - [Dashboard](#dashboard)
- [Configuration](#-configuration)
- [Testing](#-testing)
- [MLOps Practices](#-mlops-practices)
- [Performance Optimization](#-performance-optimization)
- [Contributing](#-contributing)

## ✨ Features

### Data Processing
- **Large-scale data handling**: Processes tens of GB of Amazon e-commerce data
- **Polars-based ETL**: Lazy evaluation and vectorized operations for CPU efficiency
- **Partitioned Parquet storage**: Time-based partitioning for optimal query performance
- **Great Expectations validation**: Automated data quality checks

### Feature Engineering
- **RFM Analysis**: Recency, Frequency, Monetary value features
- **Rolling Window Statistics**: 7d/30d/90d aggregations
- **Target Encoding**: Cross-validated to prevent data leakage
- **Temporal Features**: Cyclic encoding (sin/cos), holiday markers

### Machine Learning
- **LightGBM & CatBoost**: High-performance gradient boosting models
- **Optuna Hyperparameter Tuning**: Bayesian optimization with parallel trials
- **Time Series Cross-Validation**: Prevents future data leakage
- **MLflow Integration**: Experiment tracking and model registry
- **ONNX Export**: CPU-optimized inference

### Monitoring & Retraining
- **Evidently AI Drift Detection**: PSI, Wasserstein distance, target drift
- **Performance Decay Monitoring**: Consecutive drop detection
- **Automated Retraining Triggers**: Conditional based on drift thresholds
- **Prefect Orchestration**: Production pipeline scheduling

### Visualization
- **Streamlit Dashboard**: Interactive analytics web interface
- **Plotly Visualizations**: Trend analysis, distributions, correlations
- **SHAP Integration**: Model interpretability and feature importance
- **Drift Reports**: Historical monitoring results

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Data Processing** | Polars, PyArrow, Dask, Parquet |
| **ML Models** | LightGBM, CatBoost, Scikit-learn, XGBoost |
| **Hyperparameter Optimization** | Optuna |
| **Experiment Tracking** | MLflow |
| **Data Versioning** | DVC |
| **Drift Monitoring** | Evidently AI |
| **Pipeline Orchestration** | Prefect |
| **Inference** | ONNX Runtime |
| **Visualization** | Streamlit, Plotly, SHAP, Datashader |
| **Testing & Quality** | pytest, Great Expectations, mypy, ruff |

## 📁 Project Structure

```
commercial-ml-analysis/
├── data/                      # DVC-managed data
│   ├── raw/                   # Raw input data (Amazon reviews)
│   ├── processed/             # Cleaned and transformed data
│   ├── features/              # Feature matrices
│   ├── models/                # Trained model artifacts
│   ├── onnx_models/           # ONNX-optimized models
│   └── monitoring/            # Drift detection reports
├── src/
│   ├── data/
│   │   └── etl.py            # ETL pipeline with Polars & Great Expectations
│   ├── features/
│   │   └── feature_engineer.py # RFM, rolling stats, target encoding
│   ├── models/
│   │   └── train.py          # LightGBM + Optuna + MLflow + ONNX
│   ├── monitoring/
│   │   └── drift_check.py    # Evidently drift detection
│   ├── dashboard/
│   │   └── app.py            # Streamlit dashboard
│   └── utils.py              # Shared utilities
├── configs/
│   ├── model_config.yaml     # Model hyperparameters & training settings
│   ├── monitoring_config.yaml # Drift thresholds & retraining triggers
│   └── pipeline_config.yaml  # ETL & pipeline configuration
├── pipeline/
│   └── continuous_ml_pipeline.py # Prefect orchestration DAGs
├── tests/                    # pytest test suite
│   ├── test_etl.py
│   ├── test_features.py
│   ├── test_monitoring.py
│   └── test_training.py
├── notebooks/                # Exploratory analysis & prototyping
├── dvc.yaml                  # DVC pipeline definitions
├── pyproject.toml            # Project metadata & tool configs
├── requirements.txt          # Python dependencies
├── Makefile                  # Convenience commands
└── README.md                 # This file
```

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone <repo-url>
cd commercial-ml-analysis

# 2. Create virtual environment
python -m venv .venv
source .venv/bin/activate

# 3. Install dependencies
make install

# 4. Place your Parquet files in data/raw/
# (Amazon review data in Parquet format)

# 5. Run full pipeline
make pipeline

# 6. Start dashboard
make dashboard
```

## 📦 Installation

### Prerequisites
- Python 3.10 or higher
- pip or poetry
- Git & DVC (for data versioning)

### Setup

```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# or
.venv\Scripts\activate     # Windows

# Install all dependencies
pip install -r requirements.txt

# Install project in development mode
pip install -e .

# Initialize DVC (optional)
dvc init
```

### Development Setup

```bash
# Install development dependencies
pip install -e ".[dev]"

# Install pre-commit hooks (optional, requires pre-commit)
pre-commit install
```

## 📊 Data Preparation

### Supported Data Format

The system expects Amazon e-commerce data in **Parquet format**. Supported schemas:

#### Amazon Reviews Schema

| Column | Type | Description |
|--------|------|-------------|
| `review_id` | string | Unique review identifier |
| `reviewer_id` | string | User/Reviewer ID |
| `product_id` | string | Product ASIN/ID |
| `review_date` | datetime | Review timestamp |
| `star_rating` | float | 1-5 star rating |
| `helpful_votes` | int | Number of helpful votes |
| `review_body` | string | Review text |
| `product_title` | string | Product title |
| `product_category` | string | Product category |
| `marketplace` | string | Marketplace code (US, UK, DE, etc.) |
| `verified_purchase` | boolean | Verified purchase flag |
| `vine` | boolean | Vine program flag |

### Data Sources

- **Hugging Face**: `amazon_reviews_multi`, `amazon_us_reviews`
- **Kaggle**: Amazon Review Data datasets
- **AWS Open Data**: Amazon Customer Reviews Dataset

### Loading Data

```bash
# Download Amazon reviews data
# Example: Convert from source format to Parquet
python scripts/convert_to_parquet.py --input raw_data.json --output data/raw/reviews.parquet

# Verify data
python src/data/etl.py --input-pattern "*.parquet"
```

## 🎮 Usage

### ETL Pipeline

Extract, transform, and load raw data with validation:

```bash
# Run ETL with defaults
make etl

# Or with custom parameters
python src/data/etl.py \
    --input-pattern "*.parquet" \
    --config configs/pipeline_config.yaml \
    --output-dir data/processed

# The ETL pipeline:
# 1. Scans raw Parquet files using Polars (lazy evaluation)
# 2. Cleans data (handles nulls, duplicates, invalid ratings)
# 3. Engineers temporal features (year, month, cyclic encoding)
# 4. Computes RFM features (recency, frequency, monetary)
# 5. Validates with Great Expectations
# 6. Writes partitioned Parquet output
```

### Feature Engineering

Compute ML-ready feature matrices:

```bash
# Run feature engineering
make features

# Or with custom parameters
python src/features/feature_engineer.py \
    --input-pattern "**/*.parquet" \
    --output-name features.parquet \
    --config configs/pipeline_config.yaml

# Features computed:
# - Temporal features (year, month, day, cyclic encoding)
# - RFM features (recency, frequency, monetary metrics)
# - Rolling window statistics (7d, 30d, 90d)
# - Target encoding (with CV to prevent leakage)
# - Frequency encoding for categoricals
# - Interaction features (review length, verified purchase, etc.)
```

### Model Training

Train models with hyperparameter optimization:

```bash
# Train with Optuna optimization (default)
make train

# Or with custom parameters
python src/models/train.py \
    --features data/features/features.parquet \
    --target-col converted \
    --task-type conversion_prediction \
    --model-config configs/model_config.yaml

# Train without Optuna (faster)
python src/models/train.py \
    --features data/features/features.parquet \
    --target-col converted \
    --no-optuna

# Training pipeline:
# 1. Loads feature matrix and target variable
# 2. Computes class weights for imbalance
# 3. Runs TimeSeriesSplit cross-validation
# 4. Optimizes hyperparameters with Optuna (optional)
# 5. Tracks experiments in MLflow
# 6. Exports model to ONNX format
# 7. Logs metrics and feature importance
```

#### MLflow Tracking

```bash
# Start MLflow UI
mlflow ui --port 5000

# View experiments at http://localhost:5000
```

### Drift Monitoring

Detect data and concept drift:

```bash
# Run drift detection
make monitor

# Or with custom parameters
python src/monitoring/drift_check.py \
    --reference data/features/baseline.parquet \
    --current data/features/features.parquet \
    --target-col converted \
    --auc 0.85 \
    --config configs/monitoring_config.yaml

# Monitors:
# - Data Drift: PSI (Population Stability Index)
# - Wasserstein distance for feature distributions
# - Target Drift: Distribution changes in target variable
# - Performance Decay: Consecutive metric drops
# - Retraining Triggers: Automated based on thresholds
```

#### Drift Thresholds

| Metric | Threshold | Action |
|--------|-----------|--------|
| PSI | > 0.15 | Trigger retraining |
| Performance Drop | > 3% for 3 periods | Trigger retraining |
| Target Drift (KS) | > 0.05 | Alert & investigate |

### Continuous Training

Run the full automated pipeline with Prefect:

```bash
# Run full pipeline (ETL → Features → Drift → Train)
make pipeline

# Force retraining (skip drift check)
make pipeline-force

# Or with custom parameters
python pipeline/continuous_ml_pipeline.py \
    --config configs/pipeline_config.yaml \
    --monitoring-config configs/monitoring_config.yaml \
    --input-pattern "*.parquet" \
    --target-col converted \
    --task-type conversion_prediction \
    --force-retrain

# Pipeline stages:
# 1. ETL: Clean and transform raw data
# 2. Feature Engineering: Compute ML features
# 3. Drift Detection: Check for data/concept drift
# 4. Conditional Retraining: Train if drift detected
# 5. Model Registration: Save to MLflow registry
# 6. ONNX Export: Optimize for inference
```

#### Prefect UI

```bash
# Start Prefect server
prefect server start

# Deploy pipeline
prefect deployment build pipeline/continuous_ml_pipeline.py:continuous_ml_flow \
    --name "ml-pipeline" \
    --cron "0 2 * * *"  # Daily at 2 AM

# Access UI at http://localhost:4200
```

### Dashboard

Start the interactive Streamlit dashboard:

```bash
# Start dashboard
make dashboard

# Or with custom port
streamlit run dashboard/app.py --server.port 8501

# Access at http://localhost:8501
```

#### Dashboard Features

- **Overview Tab**: Rating trends, distributions, data summary
- **Feature Analysis Tab**: Correlation heatmaps, feature statistics
- **Monitoring Tab**: PSI trends, performance history, drift reports

## ⚙️ Configuration

### Model Configuration (`configs/model_config.yaml`)

```yaml
model:
  lightgbm:
    objective: "binary"
    metric: ["binary_logloss", "auc"]
    num_leaves: 31
    max_depth: 6
    learning_rate: 0.05
    n_estimators: 1000

optuna:
  n_trials: 100
  timeout: 3600  # 1 hour
  direction: "maximize"

cross_validation:
  method: "TimeSeriesSplit"
  n_splits: 5
  gap: 7  # Days gap to prevent leakage
```

### Monitoring Configuration (`configs/monitoring_config.yaml`)

```yaml
drift:
  data_drift:
    psi_threshold: 0.15
  
  concept_drift:
    performance_drop_threshold: 0.03  # 3%
    consecutive_periods: 3
  
  retraining:
    triggers:
      - type: "psi_exceeded"
        condition: "psi > 0.15"
      - type: "performance_decay"
        condition: "auc_drop > 3% for 3 consecutive periods"
```

### Pipeline Configuration (`configs/pipeline_config.yaml`)

```yaml
pipeline:
  etl:
    chunk_size: 1000000
    partition_by: ["year", "month"]
    compression: "snappy"
  
  features:
    rolling_stats:
      windows: [7, 30, 90]
    
    target_encoding:
      cv_folds: 5
      smoothing: 10
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
make test

# Or with pytest directly
pytest tests/ -v --cov=src --cov-report=term-missing

# Run specific test file
pytest tests/test_etl.py -v

# Run with coverage report
pytest --cov=src --cov-report=html
# Open htmlcov/index.html in browser
```

### Code Quality

```bash
# Run linter and formatter
make lint

# Or individually
ruff check src/ tests/
ruff format src/ tests/
mypy src/
```

## 🔬 MLOps Practices

### 1. Reproducibility
- **DVC** for data and pipeline versioning
- **MLflow** for experiment tracking and model registry
- **YAML configs** for all hyperparameters and thresholds
- **Deterministic random seeds** for reproducible splits

### 2. Data Quality
- **Great Expectations** validation in ETL pipeline
- **Schema enforcement** and type checking
- **Automated null/invalid value handling**
- **Data quality reports** with metrics

### 3. Model Validation
- **Time Series Split** to prevent data leakage
- **Cross-validated target encoding**
- **Class imbalance handling** (scale_pos_weight)
- **Early stopping** to prevent overfitting

### 4. Monitoring
- **Continuous drift detection** (PSI, Wasserstein)
- **Performance decay tracking**
- **Automated retraining triggers**
- **Alert logging** for threshold violations

### 5. Continuous Integration
- **Comprehensive test suite** with mock data
- **Type hints** and mypy checking
- **Code formatting** with ruff
- **Coverage reporting**

## ⚡ Performance Optimization

### CPU Efficiency
- **Polars Lazy Evaluation**: Defers computation until collect()
- **Vectorized Operations**: No for-loops over rows
- **Chunked Processing**: Dask for out-of-core computation
- **Multi-threading**: `num_threads=os.cpu_count()` for model training

### Memory Management
- **Streaming Mode**: `collect(streaming=True)` for large datasets
- **Partitioned Storage**: Time-based partitioning limits data scanned
- **Compression**: Snappy compression for Parquet files
- **Aggregation Before Visualization**: <50k points per plot

### Inference Optimization
- **ONNX Export**: Optimized runtime for CPU inference
- **Batch Prediction**: Vectorized inference over single predictions
- **Feature Caching**: Pre-computed features avoid recomputation

### Dashboard Performance
- **Data Caching**: `@st.cache_data` with TTL
- **Pre-aggregation**: Resample and groupby before rendering
- **Lazy Loading**: Load only required columns
- **Plotly Optimization**: Use scattergl for large datasets

## 🤝 Contributing

### Development Workflow

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and write tests
3. Run tests: `make test`
4. Run linter: `make lint`
5. Commit with conventional message
6. Push and create PR

### Code Standards

- **Type Hints**: All functions must have type annotations
- **Docstrings**: Google-style docstrings for all public functions
- **Testing**: Minimum 80% test coverage
- **Linting**: Pass ruff and mypy checks

### Adding New Features

1. **New Feature Type**: Add to `src/features/feature_engineer.py`
2. **New Model**: Add to `src/models/train.py` with config support
3. **New Metric**: Add to monitoring module and config
4. **Tests**: Write corresponding tests in `tests/`
5. **Docs**: Update README and config examples

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Amazon for providing open review datasets
- Polars, LightGBM, and MLflow communities
- Evidently AI for drift monitoring tools
- Prefect for pipeline orchestration

## 📧 Contact

For questions or support, open an issue on GitHub or contact the ML team.
