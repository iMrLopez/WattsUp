import os
import threading
from pyswip import Prolog
from models import FactInput, EstimateInput
from database import get_db_connection
import statistics

# Lock para garantizar acceso exclusivo al intérprete Prolog
_prolog_lock = threading.Lock()

# Inicializar Prolog y cargar reglas
prolog = Prolog()
RULES_DIR = "rules"
for fn in os.listdir(RULES_DIR):
    if fn.endswith(".pl"):
        prolog.consult(os.path.join(RULES_DIR, fn))

def reset_facts(preds: list):
    """
    Retracta todos los hechos de cada predicado en la lista.
    """
    with _prolog_lock:
        for p in preds:
            prolog.query(f"retractall({p}(_))")

def add_fact(f: str):
    """
    Aserta un nuevo hecho en Prolog.
    """
    with _prolog_lock:
        prolog.assertz(f)

def add_prolog(fact_data: FactInput):
    """
    Endpoint para añadir un hecho arbitrario desde FastAPI.
    """
    try:
        with _prolog_lock:
            prolog.assertz(fact_data.fact)
        return {"message": "Fact added successfully", "fact": fact_data.fact}
    except Exception as e:
        return {"error": str(e)}



def query_prolog(rule: str, *args):
    """
    Realiza una consulta a Prolog:
    - Si no se pasan args, genera `rule(Value)`.
    - Si se pasan args, genera `rule(arg1, arg2, ..., Value)`.
    Devuelve el promedio de los valores numéricos obtenidos.
    """
    var = "Value"
    if args:
        q = f"{rule}({', '.join(map(str, args))}, {var})"
    else:
        q = f"{rule}({var})"
    with _prolog_lock:
        results = list(prolog.query(q))
    if not results:
        return None
    vals = [res[var] for res in results if isinstance(res.get(var), (int, float))]
    return statistics.mean(vals) if vals else None

def get_rate(company: str, period: str) -> float:
    """
    Recupera de la BD la tarifa (₡/kWh) para la compañía y período indicados.
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT rate FROM tariffs WHERE company = %s AND period = %s",
                (company, period)
            )
            row = cur.fetchone()
    if not row:
        raise ValueError(f"Tarifa no encontrada para {company}–{period}")
    return float(row[0])

def prepare_prolog_facts(est: EstimateInput):
    # 1) retract de todos los hechos dinámicos
    reset_facts(['battery_capacity', 'vehicle_age', 'charging_duration', 'charging_rate', 'tariff'])
    # 2) asert de hechos de usuario
    add_fact(f"battery_capacity({est.battery_capacity})")
    add_fact(f"vehicle_age({est.vehicle_age})")
    add_fact(f"charging_duration({est.charging_duration})")
    # 3) siembra las tarifas actuales desde la BD
    seed_tariffs()

# ------------------------------------------------------------
# Funciones de siembra de hechos
# ------------------------------------------------------------

def seed_battery_age_facts():
    """
    Carga hechos desde la vista `energy_cars_facts_view`:
      - battery_capacity/1
      - vehicle_age/1
    y los aserta en Prolog.
    """
    reset_facts(['battery_capacity', 'vehicle_age'])
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT battery_capacity, age FROM energy_cars_facts_view")
            rows = cur.fetchall()

    for cap, age in rows:
        add_fact(f"battery_capacity({cap})")
        add_fact(f"vehicle_age({age})")

    return {"message": f"Seeded {len(rows)} battery_capacity and vehicle_age facts"}

def seed_tariffs():
    """
    Retira todos los hechos tariff/3 y los vuelve a cargar desde la BD.
    """
    # 1) borramos las tarifas anteriores
    reset_facts(['tariff'])
    # 2) leemos la tabla y asertamos
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT company, period, rate FROM tariffs")
            for company, period, rate in cur.fetchall():
                # company y period son strings; los ponemos entre comillas simples
                add_fact(f"tariff('{company}','{period}',{rate})")



