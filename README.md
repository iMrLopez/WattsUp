
| ![WattsUp Logo](./assets/logo-nobg.png) | A machine learning-powered system for predicting the impact of electric vehicle (EV) charging on electricity costs. Users can input their consumption data, EV model, and tariff details to receive personalized cost estimates. Built with FastAPI, React, and PostgreSQL. 🚗⚡|
|--|--|

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Project Structure](#pre-requisites)
-   [Pre-requisites](#docker--deployment)
- [Setup & run the application](#setup-and-run-the-application)
-   [Prolog Query Endpoints](#prolog-query-endpoints)

## Features

-   **Modern Frontend:** Developed with Next.js, featuring server-side rendering and TypeScript for robust code.
-   **Backend API:** Python-based backend with modular routers and database integration.
-   **Rule-Based Analysis:** Incorporates Prolog rules for energy efficiency and charge rate calculations.
-   **Database Management:** SQL scripts and CSV data are provided to initialize and populate the car database.
-   **Dockerized Environment:** Docker and Docker Compose configuration for easy deployment and consistent environments.

## Project Structure

```
├── backend
│   ├── app
│   │   ├── routers
│   │   ├── core
│   │   ├── models.py
│   │   ├── database.py
│   │   ├── config.py
│   │   └── main.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .gitignore
├── databaseDefinition
│   ├── a_init_cars.sql
│   └── b_cars_data.csv
├── frontend
│   ├── components
│   ├── pages
│   ├── public
│   ├── styles
│   ├── package.json
│   ├── tsconfig.json
├── utils
│   └── start_clean.sh
├── docker-compose.yml
├── .gitignore
└── README.md` 
```

## Pre-requisites

- install docker  desktop from [here](https://docs.docker.com/desktop/)

## Setup and run the application

### Easy start (for mac m1 & superior)
With docker installed, run the comand `./utils/start_clean.sh`

### Docker & Deployment Setup

The project includes a `docker-compose.yml` file for easier containerized deployment. To build and run the entire application with Docker:

`docker-compose up --build` 

This command will start both the frontend and backend services, along with any other configured services (like the database).

### Manual Installation & Setup

#### Frontend

1.  **Navigate to the frontend directory:**
    
    `cd frontend` 
    
2.  **Install dependencies:**
    
    `npm install` 
    
3.  **Run the development server:**    
    `npm run dev` 
    

#### Backend

1.  **Navigate to the backend directory:**
    
    `cd backend` 
    
2.  **Create a virtual environment (optional but recommended):**
    
    
    `python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate` 
    
3.  **Install dependencies:**

    
    `pip install -r requirements.txt` 
    
4.  **Run the backend server:**
  
    
    `python app/main.py` 
    

### Database Initialization

-   The `databaseDefinition` folder contains an SQL script (`a_init_cars.sql`) to set up your database schema and a CSV file (`b_cars_data.csv`) with car data.
-   Use your preferred SQL client or command line tool to execute the SQL script.
-   Import the CSV data into your database according to your database system’s guidelines.

### Running the Application

-   **Frontend:** Accessible at http://localhost:3000 (or your configured port).
-   **Backend:** Runs on its designated port (configured in your `config.py` or via environment variables).

Make sure the backend API endpoint is correctly referenced by your frontend application.

---
### Prolog Query Endpoints

  

This service supports multiple Prolog rules stored in the `app/core/prolog_engine.py` file and additional rules in the `app/routers` (if needed). The rules are loaded automatically and can be accessed via the query endpoints.

  

-  **GET /query?rule=&args=**

Executes a Prolog rule with comma-separated arguments.

**Example:**

`http://localhost:8000/query?rule=charging_rate&args=Rate`

  
  

-  **POST /query/add_fact**

Adds a new fact to the Prolog engine.

**Example using curl:**

```bash

curl  --location  'http://localhost:8000/query/add_fact'  \

--header 'Content-Type: application/json' \

--data  '{"fact": "battery_capacity(20)"}'

```

