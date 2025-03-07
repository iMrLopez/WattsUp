from pydantic import BaseModel

class FactInput(BaseModel):
    fact: str

class Car(BaseModel):
    id: int
    position: int
    model_name: str
    availability_date: str
    market_segment: str
    number_of_seats: int
    range: str
    efficiency: str
    weight: str
    acceleration_0_100: str
    one_stop_range: str
    battery_capacity: str
    fastcharge_speed: str
    towing_capacity: str
    cargo_volume: str
    price_per_range: str
    price_in_germany: str
    price_in_netherlands: str
    price_in_uk: str
    vehicle_url: str
    image_url: str

    class Config:
        orm_mode = True
