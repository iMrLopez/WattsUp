from fastapi import APIRouter, HTTPException
from typing import List
from database import get_db_connection
from models import Car

router = APIRouter()

@router.get("/", response_model=List[Car])
def get_all_cars():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            """
            SELECT id, position, model_name, availability_date, market_segment, number_of_seats,
                   range, efficiency, weight, acceleration_0_100, one_stop_range, battery_capacity,
                   fastcharge_speed, towing_capacity, cargo_volume, price_per_range, price_in_germany,
                   price_in_netherlands, price_in_uk, vehicle_url, image_url
            FROM cars;
            """
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        # Convert each row to a Car instance.
        cars = [Car(
            id=row[0],
            position=row[1],
            model_name=row[2],
            availability_date=row[3],
            market_segment=row[4],
            number_of_seats=row[5],
            range=row[6],
            efficiency=row[7],
            weight=row[8],
            acceleration_0_100=row[9],
            one_stop_range=row[10],
            battery_capacity=row[11],
            fastcharge_speed=row[12],
            towing_capacity=row[13],
            cargo_volume=row[14],
            price_per_range=row[15],
            price_in_germany=row[16],
            price_in_netherlands=row[17],
            price_in_uk=row[18],
            vehicle_url=row[19],
            image_url=row[20]
        ) for row in rows]

        return cars

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
