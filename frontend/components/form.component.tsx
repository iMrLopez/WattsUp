import React, { useEffect } from "react";
import { getCompaniesAndTariffs } from '../services/apiService';
import Car from '../models/car.interface';

interface FormComponentProps {
  car?: Car;
  handleFormCalculate: (e: {
    tiempoCarga: number;
    company: string;
    period: string;
  }) => void;
}

export default function FormComponent({
  car,
  handleFormCalculate,
}: FormComponentProps) {
  const [duration, setDuration] = React.useState<number | null>(null);
  const [company, setCompany] = React.useState<string>("none");
  const [period, setPeriod] = React.useState<string>("none");
  const [companies, setCompanies] = React.useState<string[]>([]);
  const [tariffs, setTariffs] = React.useState<string[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getCompaniesAndTariffs();
    setCompanies(response.data.companies || []);
    setTariffs(response.data.tariffs || []);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };

  // Disable button if any field is not set
  const isDisabled =
    duration === null || company === "none" || period === "none";

  return (
    <div className="after:content relative mb-5 flex w-full flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-5 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
      <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
        Selecciona tu información
      </h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="duration" className="text-sm font-semibold">
          Tiempo de carga ({duration ?? 0} horas)
        </label>
        <input
          type="range"
          id="duration"
          min={0}
          max={24}
          step={1}
          defaultValue={0}
          value={duration ?? 0}
          onChange={handleSliderChange}
        />
        <div className="flex justify-between text-xs">
          <span>0h</span>
          <span>24h</span>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex-col">
          <label htmlFor="company" className="text-sm font-semibold">
            Empresa
          </label>
          <select
            id="company"
            className="bg-transparent"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="none" disabled>
              Selecciona una empresa
            </option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-col">
          <label htmlFor="period" className="text-sm font-semibold">
            Periodo
          </label>
          <select
            id="period"
            className="bg-transparent"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="none" disabled>
              Selecciona un periodo
            </option>
            {tariffs.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex">
        <button
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isDisabled}
          onClick={() => {
            handleFormCalculate({
              tiempoCarga: duration!,
              company,
              period,
            });
          }}
        >
          Calculate
        </button>
      </div>
    </div>
  );
}
