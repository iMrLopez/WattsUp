CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    position INTEGER,
    model_name TEXT,
    availability_date TEXT,
    market_segment TEXT,
    number_of_seats INTEGER,
    range TEXT,
    efficiency TEXT,
    weight TEXT,
    acceleration_0_100 TEXT,
    one_stop_range TEXT,
    battery_capacity TEXT,
    fastcharge_speed TEXT,
    towing_capacity TEXT,
    cargo_volume TEXT,
    price_per_range TEXT,
    price_in_germany TEXT,
    price_in_netherlands TEXT,
    price_in_uk TEXT,
    vehicle_url TEXT,
    image_url TEXT
);

COPY cars(
    position,
    model_name,
    availability_date,
    market_segment,
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
    price_per_range,
    price_in_germany,
    price_in_netherlands,
    price_in_uk,
    vehicle_url,
    image_url
)
FROM '/docker-entrypoint-initdb.d/b_cars_data.csv'
DELIMITER ','
CSV HEADER;
