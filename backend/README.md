# FastAPI Python Service 

WattsUp/
│── backend/
│   ├── main.py               # FastAPI entry point
│   ├── prolog_engine.py      # Handles Prolog logic
│   ├── rules/                 # Prolog rules folder (.pl)
│   ├── requirements.txt      # Python dependencies
│   ├── __init__.py           # Package marker
|   |── README.md             # Documentation


## Usage

The following service has been made in order to support many prolog rules via rules folder, these rules are loaded automatically and can be used via Query as follows.
http://localhost:8000/query?rule=<RULE_NAME>&args=<ARG1,ARG2,...>

i.e 
http://0.0.0.0:8000/query?rule=charging_rate&args=Rate

## Adding facts
To include facts via prolog you need a HTTP Post with the following payload. 
{"fact": "<FACT(ARGS...)>"}

i.e 
curl --location 'http://0.0.0.0:8000/add_fact' \
--header 'Content-Type: application/json' \
--data '{"fact": "battery_capacity(20)"}'