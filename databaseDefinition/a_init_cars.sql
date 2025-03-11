CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    position INTEGER,
    model_name TEXT,
    number_of_seats INTEGER,
    range TEXT,
    efficiency TEXT, -- Wh/km
    weight TEXT, -- kg
    acceleration_0_100 TEXT,
    one_stop_range TEXT, -- km
    battery_capacity TEXT, -- kWh
    fastcharge_speed TEXT, -- kW
    towing_capacity TEXT, -- kg
    cargo_volume TEXT,
    price_in_uk TEXT,
    image_url TEXT,
    launch_date TEXT,
    discontinue_date TEXT,
    is_available BOOLEAN
);

COPY cars(
    position,
    model_name,
    number_of_seats,
    range,
    efficiency,
    weight,
    acceleration_0_100,
    one_stop_range,
    battery_capacity,
    fastcharge_speed,
    towing_capacity,
    cargo_volume,
    price_in_uk,
    image_url,
    launch_date,
    discontinue_date,
    is_available
)
FROM '/docker-entrypoint-initdb.d/cars_data.csv'
DELIMITER ';'
CSV HEADER;
