from fastapi import APIRouter, HTTPException
from typing import List
from database import get_db_connection
from models import Car

router = APIRouter()

@router.get("/", response_model=List[Car])
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
                is_available=bool(row[17])
            ) 
            for row in rows
        ]

        return cars

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))