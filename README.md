| ![WattsUp Logo](./assets/logo-nobg.png) | A machine learning‑powered system for predicting the impact of electric vehicle (EV) charging on electricity costs. Users input their consumption data, EV model, and tariff details to receive personalized cost estimates. Built with FastAPI, Prolog, React (Next.js) and PostgreSQL. 🚗⚡ |
|--|--|

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Pre-requisites](#pre-requisites)
- [Setup & Run](#setup--run)
- [API Endpoints](#api-endpoints)
  - [Estimate Cost](#estimate-cost)
  - [Lookup Metadata](#lookup-metadata)
  - [Companies with Tariffs](#companies-with-tariffs)
- [Prolog Query Endpoints](#prolog-query-endpoints)
- [Docker & Deployment](#docker--deployment)

## Overview
A CLI and web‑based tool that leverages rule‑based Prolog inference combined with machine learning to estimate how much an EV charging session will add to your electricity bill. It provides:

- A `/estimate` endpoint to calculate energy (kWh) and estimated cost (₡) based on battery capacity, vehicle age, charging duration, company and period.
- Metadata endpoints to fetch available companies, periods, and detailed tariff tables.
- A modern Next.js frontend with React & TypeScript for interactive user input and result display.

## Features

- **Energy Prediction**: Uses Prolog rules (`energy_required`, `charging_rate_value`) for kWh estimation.
- **Cost Estimation**: Combines energy estimate with dynamic tariffs from the database via the `/estimate` endpoint.
- **Metadata Lookup**: Single `/lookup` endpoint returns lists of companies and tariff periods.
- **Detailed Tariffs**: `/companies-with-tariffs` returns structured tariff info by company and period.
- **Prolog Integration**: Dynamic seeding of Prolog facts (battery_capacity, vehicle_age, charging_duration, tariffs) from PostgreSQL.
- **Frontend**: Next.js + TypeScript + Tailwind CSS interactive form and modal components.
- **Dockerized**: Full-stack setup with Docker Compose for consistent deployment.

## Project Structure
```
├── backend
│   ├── app
│   │   ├── routers
│   │   ├── rules
│   │   ├── engine
│   │   │   └── prolog_engine.py
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── config.py
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── databaseDefinition
│   ├── a_init_cars.sql
│   ├── b_init_energy_facts.sql
|   ├── c_init_energy_tarifss.sql
│   └── view_definitions.sql
├── frontend
│   ├── components
|   ├── models
│   ├── pages
│   ├── public
│   ├── services
│   ├── styles
│   ├── utils
│   ├── package.json
│   └── tsconfig.json
├── utils
│   └── start_clean.sh
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Pre-requisites

- **Docker Desktop** (for containerized deployment)
- **Node.js** & **npm** (for local frontend dev)
- **Python 3.9+** & **pip** (for local backend dev)

## Setup & Run

### Quick Start (Docker)
```bash
./utils/start_clean.sh       # Mac M1+ friendly
# or:
docker-compose up --build    # builds and runs frontend, backend, DB
```

### Manual Installation

#### Frontend
```bash
cd frontend
env: npm install
npm run dev
# Access at http://localhost:3000
```

#### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# Runs at http://localhost:8000
```

#### Database
- Execute SQL scripts in `databaseDefinition/` to create tables and views.
- Ensure `tariffs` table is populated with current rates.

## API Endpoints

### Estimate Cost
Calculates energy and cost in one call.

**POST** `/estimate`

**Body** (JSON):
```json
{
  "battery_capacity": 75.0,
  "vehicle_age": 5.0,
  "charging_duration": 2.0,
  "company": "CNFL",
  "period": "Punta"
}
```

**Response**:
```json
{
  "energy_kwh": 40.0,
  "estimated_cost": 6278.40
}
```

### Lookup Metadata
Fetch lists of valid companies and periods.

**GET** `/lookup`

**Response**:
```json
{
  "companies": ["CNFL","ICE"],
  "tariffs": ["Punta","Valle","Nocturno"]
}
```

### Companies with Tariffs
Returns detailed tariff structure per company.

**GET** `/companies-with-tariffs`

**Response**:
```json
[
  {
    "companyName": "CNFL",
    "tariffs": [
      { "periodName": "Punta", "costKwh": 156.96 },
      { "periodName": "Valle", "costKwh": 64.35 },
      { "periodName": "Nocturno", "costKwh": 26.94 }
    ]
  },
  {
    "companyName": "ICE",
    "tariffs": [
      { "periodName": "Punta", "costKwh": 152.53 },
      { "periodName": "Valle", "costKwh": 104.80 },
      { "periodName": "Nocturno", "costKwh": 76.45 }
    ]
  }
]
```

## Prolog Query Endpoints

- **GET** `/query?rule=&args=` &rarr; raw Prolog query (useful for debugging).  
  E.g. `/query?rule=energy_required`.
- **POST** `/query/add_fact` &rarr; dynamically assert a new Fact.

## Docker & Deployment

Use `docker-compose.yml` to orchestrate:
- **frontend** (Next.js)
- **backend** (FastAPI + Prolog)
- **postgres**

```bash
docker-compose up --build\```
