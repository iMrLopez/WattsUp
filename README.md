
# WattsUp


| ![WattsUp Logo](./assets/logo-nobg.png) |  A machine learning-powered system for predicting the impact of electric vehicle (EV) charging on electricity costs. Users can input their consumption data, EV model, and tariff details to receive personalized cost estimates. Built with FastAPI, React, and PostgreSQL. 🚗⚡|
|--|--|



# FastAPI Python Backend Service

WattsUp/
│── backend/
│   ├── app/
│   │   ├── __init__.py              # Package marker
│   │   ├── main.py                  # FastAPI application entry point (creates the app, includes routers & middleware)
│   │   ├── config.py                # Application configuration (environment variables, settings)
│   │   ├── database.py              # Database connection logic
│   │   ├── schemas.py               # Pydantic models for request/response validation
│   │   ├── core/
│   │   │   └── prolog_engine.py     # Contains functions for interacting with Prolog (query, add fact)
│   │   └── routers/                 # API endpoints organized by feature
│   │       ├── __init__.py          # Package marker for routers
│   │       ├── query.py             # Endpoints for executing Prolog rules and adding facts
│   │       └── cars.py              # Endpoint for retrieving car data from the PostgreSQL database
│   ├── requirements.txt             # Python dependencies
│   ├── Dockerfile                   # Dockerfile for building the backend container
│   └── README.md                    # Documentation for the backend service

## Usage

### Prolog Query Endpoints

This service supports multiple Prolog rules stored in the `app/core/prolog_engine.py` file and additional rules in the `app/routers` (if needed). The rules are loaded automatically and can be accessed via the query endpoints.

- **GET /query?rule=&args=**  
  Executes a Prolog rule with comma-separated arguments.  
  **Example:**  
    `http://localhost:8000/query?rule=charging_rate&args=Rate`


- **POST /query/add_fact**  
Adds a new fact to the Prolog engine.  
**Example using curl:**
```bash
curl --location 'http://localhost:8000/query/add_fact' \
     --header 'Content-Type: application/json' \
     --data '{"fact": "battery_capacity(20)"}'
```