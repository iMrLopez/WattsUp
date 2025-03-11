from pyswip import Prolog
from models import FactInput
import os
import statistics

prolog = Prolog()
RULES_DIR = "rules"
for filename in os.listdir(RULES_DIR):
    if filename.endswith(".pl"):
        prolog.consult(os.path.join(RULES_DIR, filename))

def query_prolog(rule: str, *args):
    query_str = f"{rule}({', '.join(args)})"
    results = list(prolog.query(query_str))
    if not results:
        return None
    
    # Extract numerical values from results
    values = [list(res.values())[0] for res in results if isinstance(list(res.values())[0], (int, float))]
    
    if not values:
        return None
    
    return statistics.mean(values)  # Return mean value

def add_prolog(fact_data: FactInput):
    try:
        print(fact_data.fact)
        prolog.assertz(fact_data.fact)
        return {"message": "Fact added successfully", "fact": fact_data.fact}
    except Exception as e:
        return {"error": str(e)}   