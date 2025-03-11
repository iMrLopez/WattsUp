CREATE TABLE IF NOT EXISTS energy_cars_facts (
    id SERIAL PRIMARY KEY,
    model_name TEXT NOT NULL,
    battery_capacity TEXT NOT NULL, -- kWh
    launch_date DATE NOT NULL
);

CREATE VIEW energy_cars_facts_view AS
SELECT 
    id,
    model_name,
    battery_capacity,
    launch_date,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, launch_date)) AS age
FROM energy_cars_facts;

-- Insert only the required columns into the main table with formatted dates
INSERT INTO energy_cars_facts (model_name, battery_capacity, launch_date)
SELECT 
    model_name, 
    battery_capacity, 
    TO_DATE(NULLIF(launch_date, ''), 'DD-MM-YYYY')  -- Convert empty strings to NULL before converting to DATE
FROM cars
WHERE launch_date IS NOT NULL AND launch_date <> '';
