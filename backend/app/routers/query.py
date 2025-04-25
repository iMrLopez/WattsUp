from typing import Any

from engine.prolog_engine import (add_prolog, query_prolog,
                                  seed_battery_age_facts)
from fastapi import APIRouter
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


@router.post("/seed")
def add_fact():
    return seed_battery_age_facts()
