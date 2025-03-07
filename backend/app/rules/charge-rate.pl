% Reglas para determinar el Charging Rate en un sistema basado en conocimiento

% Regla 1: Si la capacidad de la batería es alta y el vehículo es nuevo, la tasa de carga es alta
charging_rate(alta) :-
    battery_capacity(C), C > 80,
    vehicle_age(A), A < 3.

% Regla 2: Si la capacidad de la batería es media y el vehículo tiene edad intermedia, la tasa de carga es media
charging_rate(media) :-
    battery_capacity(C), C >= 50, C =< 80,
    vehicle_age(A), A >= 3, A =< 7.

% Regla 3: Si la capacidad de la batería es baja o el vehículo es antiguo, la tasa de carga es baja
charging_rate(baja) :-
    battery_capacity(C), C < 50;
    vehicle_age(A), A > 7.

% Regla 4: Si el vehículo es nuevo pero la batería es pequeña, la tasa de carga es media
charging_rate(media) :-
    battery_capacity(C), C < 50,
    vehicle_age(A), A < 3.

% Regla 5: Ajuste para carga rápida
charging_rate(rapida) :-
    battery_capacity(C), C > 90,
    vehicle_age(A), A < 2.

% Regla 6: Ajuste para carga lenta debido a envejecimiento
charging_rate(lenta) :-
    battery_capacity(C), C < 60,
    vehicle_age(A), A > 8.

% Hechos de prueba
battery_capacity(75).
vehicle_age(5).

% Consulta:
% ?- charging_rate(Rate).
:- dynamic battery_capacity/1.
:- dynamic vehicle_age/1.