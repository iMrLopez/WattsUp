from typing import Dict, List

from database import get_db_connection
from fastapi import APIRouter, HTTPException
from models import Car, CompanyInfo, TariffInfo

router = APIRouter()


@router.get(
    "/companies_and_tariffs",
    response_model=Dict[str, List[str]],
    summary="Devuelve listas de compañías y periodos de tarifa",
)
def get_companies_and_tariffs() -> Dict[str, List[str]]:
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # 1) Leer todas las compañías
                cur.execute("SELECT company FROM company_view;")
                companies = [row[0] for row in cur.fetchall()]

                # 2) Leer todos los periodos (tarifas)
                cur.execute("SELECT period FROM period_view;")
                tariffs = [row[0] for row in cur.fetchall()]

        return {"companies": companies, "tariffs": tariffs}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al leer metadata: {e}")


@router.get(
    "/companies-with-tariffs",
    response_model=List[CompanyInfo],
    summary="Devuelve cada compañía con su lista de periodos y costo por kWh",
)
def get_companies_with_tariffs() -> List[CompanyInfo]:
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT company, period, rate FROM tariffs ORDER BY company, period;"
                )
                rows = cur.fetchall()
        # Agrupar por compañía
        companies_map: dict[str, List[TariffInfo]] = {}
        for company, period, rate in rows:
            if company not in companies_map:
                companies_map[company] = []
            companies_map[company].append(TariffInfo(periodName=period, costKwh=rate))

        # Convertir a lista de CompanyInfo
        result: List[CompanyInfo] = [
            CompanyInfo(companyName=company, tariffs=tariffs)
            for company, tariffs in companies_map.items()
        ]
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al cargar tarifas: {e}")


@router.get("/cars", response_model=List[Car])
def get_all_cars():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, position, model_name, number_of_seats,
                           range, efficiency, weight, acceleration_0_100, one_stop_range, battery_capacity,
                           fastcharge_speed, towing_capacity, cargo_volume, price_in_uk, image_url,
                           launch_date, discontinue_date, is_available
                    FROM cars;
                    """
                )
                rows = cur.fetchall()

        # Convert each row to a Car instance.
        cars = [
            Car(
                id=row[0],
                position=row[1],
                model_name=row[2],
                number_of_seats=row[3],
                range=str(row[4]),
                efficiency=str(row[5]),
                weight=str(row[6]),
                acceleration_0_100=str(row[7]),
                one_stop_range=str(row[8]),
                battery_capacity=str(row[9]),
                fastcharge_speed=str(row[10]),
                towing_capacity=str(row[11]),
                cargo_volume=str(row[12]),
                price_in_uk=str(row[13]),
                image_url=str(row[14]),
                launch_date=str(row[15]),
                discontinue_date=str(row[16]),
                is_available=bool(row[17]),
            )
            for row in rows
        ]

        return cars

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
