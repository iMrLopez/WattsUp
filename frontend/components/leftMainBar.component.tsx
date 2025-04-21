import React from "react";
import FormComponent from "./form.component";
import ResultsComponent from "./results.component";
import SpinnerComponent from "./spinner.component";
import { CompanyTariffsModalComponent } from "./companyTariffsModal.component";
import CarDetailComponent from './carDetail.component';
import calculateCarAge from '../utils/calculateCarAge';
import Image from "next/image";
import { estimate } from '../services/apiService';
import Car, { EstimateInput } from '../models/car.interface';

interface FormComponentProps {
  car?: Car;
}
const KW_PER_HOUR_COST = 64.5;

export default function LeftMainBarComponent({ car }: FormComponentProps) {
  const [results, setResult] = React.useState<any>(null);
  const [duration, setDuration] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleSubmit = async (v: {
    tiempoCarga: number;
    company: string;
    period: string;
  }) => {
    setDuration(v.tiempoCarga);
    setLoading(true);
    setError(null);

    const payload: EstimateInput = {
      battery_capacity: parseFloat(car.battery_capacity),
      vehicle_age: calculateCarAge(car.launch_date),
      charging_duration: v.tiempoCarga,
      company: v.company,
      period: v.period,
    };

    try {
      const { data } = await estimate(payload);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="after:content relative mb-5 flex flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-5 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
      <div className="absolute flex items-center justify-center opacity-20">
        <span className="flex max-h-full max-w-full items-center justify-center"></span>
        <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
      </div>
      <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
        WattsUp
      </h1>
      <div className="mb-6 flex items-center justify-center">
        <Image
          src="/logo-nobg.png"
          alt="WattsUp Logo"
          width={150}
          height={50}
          priority
        />
      </div>
      {car ? <CarDetailComponent car={car} /> : (
        <h1>Selecciona un vehículo</h1>
      )}

      <div className="flex flex-col items-center gap-4 p-4">
        <button
          onClick={() => setModalOpen(true)}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Ver tarifas electricas
        </button>

        <CompanyTariffsModalComponent
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        {car ? (
          <FormComponent
            car={car}
            handleFormCalculate={(e) => handleSubmit(e)}
          />
        ) : null}
        {loading && <SpinnerComponent />}
        {results ? (
          <ResultsComponent
            duration={duration}
            energy={results.energy_kwh}
            cost={results.estimated_cost}
          />
        ) : null}
        <span>{error}</span>
      </div>
    </div>
  );
}
