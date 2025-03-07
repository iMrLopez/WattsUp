from fastapi import APIRouter
from core.prolog_engine import query_prolog, add_prolog
from models import FactInput

router = APIRouter()

@router.get("/")
def query(rule: str, args: str):
    arg_list = args.split(",")  # Expect comma-separated values.
    results = query_prolog(rule, *arg_list)
    return {"result": bool(results), "data": results}

@router.post("/add_fact")
def add_fact(fact_data: FactInput):
    return add_prolog(fact_data)
