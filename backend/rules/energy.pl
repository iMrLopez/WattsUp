% Sistema en Prolog para calcular el total de Watts requeridos para cargar un vehículo eléctrico

% Reglas basadas en Charging Duration para determinar el consumo de energía en kWh
energy_required(Consumo) :- 
    charging_duration(T), 
    T < 1, 
    Consumo is 15. % Bajo consumo (ejemplo: 15 kWh)

energy_required(Consumo) :- 
    charging_duration(T), 
    T >= 1, T < 3, 
    Consumo is 40. % Consumo medio (ejemplo: 40 kWh)

energy_required(Consumo) :- 
    charging_duration(T), 
    T >= 3, 
    Consumo is 70. % Alto consumo (ejemplo: 70 kWh)

% Conversión de kWh a Watts (1 kWh = 1000 Watts)
watts_required(Watts) :- 
    energy_required(Consumo), 
    Watts is Consumo * 1000.

% Ajuste por eficiencia según la tasa de carga
watts_required(Watts) :- 
    charging_rate(R), R > 50, charging_duration(T), T < 1, 
    energy_required(Consumo), 
    Watts is Consumo * 900. % Carga rápida, menor pérdida de energía

watts_required(Watts) :- 
    charging_rate(R), R < 10, charging_duration(T), T > 3, 
    energy_required(Consumo), 
    Watts is Consumo * 1100. % Carga ineficiente, mayor consumo total

% Hechos de prueba
charging_duration(2). % Duración de carga en horas
charging_rate(20).    % Tasa de carga en kW

% Consulta:
% ?- watts_required(Watts).