% ------------------------------------------------------------
% Conversión de energía de kWh a Watts
% (1 kWh = 1000 W)
% ------------------------------------------------------------

% La cantidad de energía calculada en kWh se convierte en Watts.
watts_required(Watts) :- 
    energy_required(Usage), 
    Watts is Usage * 1000.  % Conversión estándar de kWh a W

% ------------------------------------------------------------
% Ajustes de eficiencia según la tasa de carga (Charging Rate)
% ------------------------------------------------------------

% Regla 1: Si la tasa de carga es mayor a 50 kW y la carga es corta (< 1 hora),
% se asume una eficiencia mejorada y se ajusta la conversión.
% Se reduce el consumo total al 90% del valor normal.
watts_required(Watts) :- 
    charging_rate(R), R > 50, charging_duration(T), T < 1, 
    energy_required(Usage), 
    Watts is Usage * 900.  % Carga rápida: menor pérdida de energía

% Regla 2: Si la tasa de carga es menor a 10 kW y la carga es prolongada (> 3 horas),
% se asume una ineficiencia en la carga y se incrementa el consumo total en un 10%.
watts_required(Watts) :- 
    charging_rate(R), R < 10, charging_duration(T), T > 3, 
    energy_required(Usage), 
    Watts is Usage * 1100.  % Carga ineficiente: mayor consumo total

% ------------------------------------------------------------
% Hechos de prueba
% ------------------------------------------------------------

% Se define un caso de prueba donde la duración de carga es de 2 horas.
charging_duration(2).  % Duración de carga en horas

% Se puede definir un hecho adicional para la tasa de carga, pero está comentado.
% charging_rate(20).  % Tasa de carga en kW

% ------------------------------------------------------------
% Consulta esperada:
% ?- watts_required(Watts).
% Esto calculará los Watts requeridos basados en la duración y eficiencia de carga.
% ------------------------------------------------------------

:- dynamic charging_duration/1.