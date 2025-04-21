from fastapi import APIRouter, HTTPException
from typing import Any
from engine.prolog_engine import prepare_prolog_facts, query_prolog
from models import EstimateInput

router = APIRouter()

@router.post("/")
def estimate(input: EstimateInput) -> Any:
    """
    Estima el consumo en kWh y el costo en colones
    para la compañía y período indicados, usando Prolog.
    """
    try:
        # 1) Prepara hechos en Prolog (incluye seed de tarifas desde la BD)
        prepare_prolog_facts(input)

        # 2) Inferir consumo en kWh
        energy_kwh = query_prolog("energy_required")
        if energy_kwh is None:
            raise HTTPException(status_code=400, detail="No se pudo inferir energy_required")

        # 3) Inferir costo en colones usando estimate_cost/3
        #    (recuerda pasar company y period entre comillas simples)
        cost = query_prolog(
            "estimate_cost",
            f"'{input.company}'",
            f"'{input.period}'"
        )
        if cost is None:
            raise HTTPException(status_code=400, detail="No se pudo inferir estimate_cost")

        # 4) Devolver resultado
        return {
            "energy_kwh":     energy_kwh,
            "estimated_cost": cost
        }

    except HTTPException:
        # Re-lanzar errores HTTP provocados arriba
        raise
    except Exception as e:
        # Cualquier otro error inesperado
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")
