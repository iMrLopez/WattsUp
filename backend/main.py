from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prolog_engine import query_prolog, add_prolog
from models import FactInput

app = FastAPI()

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#http://localhost:8000/query?rule=<RULE_NAME>&args=<ARG1,ARG2,...>
@app.get("/query")
def query(rule: str, args: str):
    arg_list = args.split(",")  # Expect comma-separated values
    results = query_prolog(rule, *arg_list)
    return {"result": bool(results), "data": results}

@app.post("/add_fact")
def add_fact(fact_data: FactInput):
    return add_prolog(fact_data)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)