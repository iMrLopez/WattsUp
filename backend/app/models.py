from pydantic import BaseModel

class FactInput(BaseModel):
    fact: str

class Car(BaseModel):
    id: int
    position: int
    model_name: str
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
    price_in_uk: str
    image_url: str
    launch_date: str
    discontinue_date: str
    is_available: bool

    class Config:
        orm_mode = True
