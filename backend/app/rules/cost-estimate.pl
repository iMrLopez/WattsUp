%% cost-estimate.pl
% Sólo define la regla, las tarifas vendrán de la BD dinámicamente.

:- dynamic tariff/3.

%% Regla: estimate_cost/3
% estimate_cost(+Company, +Period, -Cost) :-
%   1) energy_required(Kwh)
%   2) tarifa dinámica assertzada desde la BD con seed_tariffs/0
%   3) Cost is Kwh * Rate

estimate_cost(Company, Period, Cost) :-
    energy_required(Kwh),
    tariff(Company, Period, Rate),
    Cost is Kwh * Rate.
