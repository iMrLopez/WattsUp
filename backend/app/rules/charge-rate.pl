% ------------------------------------------------------------
% Reglas para determinar el valor numérico de la tasa de carga en kW
% ------------------------------------------------------------

% Regla 1: Si la capacidad de la batería es alta y el vehículo es nuevo, la tasa de carga es alta.
% La tasa de carga se encuentra entre 50 - 90 kW.
charging_rate_value(70) :-
    battery_capacity(C), C > 80,
    vehicle_age(A), A < 3.

% Regla 2: Si la capacidad de la batería es media y el vehículo tiene edad intermedia, la tasa de carga es media.
% Regla 3: Si el vehículo es nuevo pero la batería es pequeña, la tasa de carga es media.
% La tasa de carga se encuentra entre 20 - 50 kW.
charging_rate_value(30) :-
    (battery_capacity(C), C >= 50, C =< 80,
    vehicle_age(A), A >= 3, A =< 7);
    (battery_capacity(C), C < 50,
    vehicle_age(A), A < 3).

% Regla 4: Si la capacidad de la batería es baja o el vehículo es antiguo, la tasa de carga es baja.
% La tasa de carga se encuentra entre 5 - 20 kW.
charging_rate_value(15) :-
    battery_capacity(C), C < 50;
    vehicle_age(A), A > 7.

% Regla 5: Ajuste para carga rápida.
% La tasa de carga se encuentra entre 90 - 120 kW.
charging_rate_value(100) :-
    battery_capacity(C), C > 90,
    vehicle_age(A), A < 2.

% Regla 6: Ajuste para carga lenta debido a envejecimiento.
% La tasa de carga se encuentra entre 1 - 5 kW.
charging_rate_value(2.5) :-
    battery_capacity(C), C < 60,
    vehicle_age(A), A > 8.

% ------------------------------------------------------------
% Hechos de prueba
% ------------------------------------------------------------
battery_capacity(75).
vehicle_age(5).

% ------------------------------------------------------------
% Consulta esperada:
% ?- charging_rate_value(Rate).
% ------------------------------------------------------------

:- dynamic battery_capacity/1.
:- dynamic vehicle_age/1.