% ------------------------------------------------------------
% Sistema en Prolog para calcular el total de Watts requeridos 
% para cargar un vehículo eléctrico
% ------------------------------------------------------------

% ------------------------------------------------------------
% Reglas para determinar el consumo de energía en kWh según 
% la duración de la carga (Charging Duration)
% ------------------------------------------------------------

% Si la duración de carga es menor a 1 hora, se considera un consumo bajo
% Se asume que el vehículo requiere 15 kWh en este caso.
energy_required(Usage) :- 
    charging_duration(T), 
    T < 1, 
    Usage is 15.  % Bajo consumo: 15 kWh

% Si la duración de carga está entre 1 y 3 horas (inclusive del 1 pero no del 3),
% se considera un consumo medio de energía de 40 kWh.
energy_required(Usage) :- 
    charging_duration(T), 
    T >= 1, T < 3, 
    Usage is 40.  % Consumo medio: 40 kWh

% Si la duración de carga es de 3 horas o más, se considera un alto consumo
% de energía, equivalente a 70 kWh.
energy_required(Usage) :- 
    charging_duration(T), 
    T >= 3, 
    Usage is 70.  % Alto consumo: 70 kWh

