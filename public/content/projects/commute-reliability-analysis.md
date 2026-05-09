# CommuteReliability (Baseline MVP)

CommuteReliability is a multi-modal commute reliability analytics app focused on explainable, baseline statistics first (no ML in the MVP).

This MVP provides:
- TDX bus client (routes, stops-of-route, ETA snapshots)
- Optional metro station metadata cache (for bus→metro candidate generation)
- On-disk time-window storage (SQLite)
- ETA accuracy analytics (bias/error by route/stop/time buckets)
- Transfer miss risk (buffer-based, baseline proxy)
- Route reliability ranking (baseline scoring)
- Commute plan scoring (multi-leg aggregation)
- Auto candidate generation + scoring from origin/destination coordinates
- FastAPI endpoints + minimal dashboard

## Prerequisites

- Python 3.10+
- TDX API credentials (client credentials grant)

## Setup

1) Create a virtualenv and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

2) Configure environment variables:

```bash
cp .env.example .env
```

Set `TDX_CLIENT_ID` and `TDX_CLIENT_SECRET`.

3) (Optional) Adjust runtime config in `configs/default.yaml`.

## Run the API + Dashboard

```bash
uvicorn commute_reliability.api.main:app --reload
```

Open:
- Dashboard: `http://127.0.0.1:8000/`
- OpenAPI: `http://127.0.0.1:8000/docs`

## Control Center (Dashboard)

The dashboard includes a Control Center panel for operational workflows:
- Cache status + background jobs status (`/cache/status`, `/ops/status`)
- One-click cache + ETA polling (background threads via `/ops/*`)
- Runtime settings patch (apply without restart via `/settings/apply`)
- Save an overrides file (gitignored) and reuse on restart via `COMMUTE_REL_CONFIG=configs/overrides.local.yaml`
- Command palette (`Ctrl/Cmd+K`) + hotkeys modal (`?`)
- Coordinate nudge controls (Unity-style `W/A/S/D`) for candidate generation tuning

## Collect ETA Snapshots (for analytics)

The analytics endpoints require stored ETA observations.

Example (poll a route for 30 minutes):

```bash
python -m commute_reliability.ingestion.poll_eta --route-id <RouteUID> --minutes 30
```

Poll multiple routes in a loop:

```bash
python -m commute_reliability.ingestion.poll_eta_multi --route-id <RouteUID> --route-id <RouteUID> --minutes 30
```

You can also start/stop multi-route polling from the dashboard via:
- `POST /ops/poll_eta_multi/start`
- `POST /ops/poll_eta_multi/stop`

## ETA Accuracy Method (Baseline Proxy)

This MVP infers "arrival events" from ETA snapshots:
- An arrival event is detected when `EstimateTime <= analytics.arrival_detection_eta_seconds`.
- Accuracy is evaluated at a fixed look-back horizon (default `analytics.evaluation_horizon_seconds`), using the closest snapshot within `analytics.evaluation_horizon_tolerance_seconds`.

All thresholds and time windows live in `configs/default.yaml`.

## Transfer Risk Method (Baseline Proxy)

This MVP defines bus→metro transfer miss risk using historical ETA error samples:
- `error_seconds = predicted_arrival_time - inferred_arrival_time`
- `buffer_seconds` is the slack between your planned connection departure and the predicted bus arrival (+ walking + station buffer)
- Miss probability is computed as `P(error_seconds < -buffer_seconds)`

Endpoint: `GET /transfer/risk`

## Reliability Ranking (Baseline)

This MVP supports simple reliability ranking for bus routes based on ETA accuracy metrics:
- Score uses a weighted combination of MAE, absolute error percentile, and absolute bias
- A sample-size factor reduces scores when evaluation counts are low

Endpoint: `GET /ranking/bus`

## Commute Recommendations (Baseline)

Commute recommendations combine:
- Bus reliability score (ETA accuracy-based)
- Transfer reliability score (1 - miss probability at a configured buffer)

Configure plans in `configs/default.yaml` under `commute.plans`, or write plans to the file path in `commute.plans_path` (loaded on startup).

Example:

```yaml
commute:
  plans:
    - id: sample_multi_leg
      name: "Sample: Bus → Metro → Bus"
      city: Taipei
      legs:
        - id: bus_1
          name: "Bus to MRT"
          bus:
            route_id: "<RouteUID_1>"
            direction: 0
            stop_id: "<StopUID_transfer_1>"
          transfer:
            enabled: true
            buffer_seconds: 300
            headway_seconds: 240
            walking_seconds: 300
            platform_buffer_seconds: 60
        - id: bus_2
          name: "Last-mile bus"
          bus:
            route_id: "<RouteUID_2>"
            direction: 0
            stop_id: "<StopUID_destination>"
```

Endpoints:
- `GET /commute/plans`
- `GET /commute/recommendations`

## Auto Candidate Generation (Baseline)

Candidate generation uses cached stop geometry:
- Cache all routes + stops-of-route (once per city):
  - `python -m commute_reliability.ingestion.cache_bus_city --city Taipei --refresh`
- Cache metro stations (optional, for bus→metro candidates):
  - `python -m commute_reliability.ingestion.cache_metro --operator TRTC --refresh`

Endpoints:
- `GET /commute/candidates`
- `GET /commute/candidates/recommendations` (scores candidates over a time window)
- `POST /commute/plans/save` (persist selected candidates as configured plans)
- `GET /cache/status` (inspect cache row counts)
- `GET /metro/stations` (list/refresh station metadata)
- `GET /ops/status` (inspect background jobs)
- `POST /ops/cache/bus_city/start|stop` (cache routes + stops-of-route per city)
- `POST /ops/cache/metro/start` (cache metro station metadata)
- `POST /ops/poll_eta_multi/start|stop` (poll ETA snapshots in a background loop)
- `GET /settings` (inspect current runtime settings)
- `POST /settings/apply` (deep-merge a validated settings patch; optional YAML persist)

Workflow CLI (no API required):

```bash
python -m commute_reliability.workflows.bootstrap_commute \
  --cache-bus --cache-metro --refresh \
  --origin-lat 25.0330 --origin-lon 121.5654 \
  --dest-lat 25.0478 --dest-lon 121.5170 \
  --save-plans
```

Candidate types currently generated:
- `bus_direct` (no transfers)
- `bus_to_bus` (one bus transfer)
- `bus_to_metro` (bus to an entry station + metro to a destination-near station; metro segment is baseline-estimated)

## Project Layout (Layered)

- `src/commute_reliability/ingestion/`: TDX clients + snapshot collection
- `src/commute_reliability/preprocessing/`: event extraction / cleaning
- `src/commute_reliability/analytics/`: baseline metrics and scoring
- `src/commute_reliability/api/`: FastAPI routers
- `web/`: minimal dashboard (static)
- `configs/`: YAML configs (all thresholds, windows, weights)
