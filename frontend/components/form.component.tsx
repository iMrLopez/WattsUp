import Car from "../models/Car.interface";
import Image from "next/image";
import React from "react";
import { addFact, queryRule } from "../services/apiService";
import { FaBatteryFull, FaCalendarPlus } from 'react-icons/fa';
import IconValue from './iconValue.component';
import { Badge } from './badge.component';

interface FormComponentProps {
  car?: Car;
}
const KW_PER_HOUR_COST = 64.5;

// Helper function to calculate age
function calculateCarAge(launchDate: string): number {
  const launch = new Date(launchDate);
  const today = new Date();
  let age = today.getFullYear() - launch.getFullYear();
  const monthDiff = today.getMonth() - launch.getMonth();

  // If the current month and day are before the launch month and day, subtract one year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < launch.getDate())) {
    age--;
  }

  return age;
}

export default function FormComponent({ car }: FormComponentProps) {
  const [duration, setDuration] = React.useState(1);
  const [rate, setRate] = React.useState(0);
  const [cost, setCost] = React.useState(0);

  const handleSliderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = Number(e.target.value);
    setDuration(newDuration);

    try {
      await Promise.all([
        addFact(`vehicle_age(${newDuration})`),
        addFact(`battery_capacity(${newDuration})`),
      ]);

      const rateResult = await queryRule("charging_rate_value", "Rate");
      if (rateResult.data) {
        setRate(rateResult.data);
        await addFact(`charging_rate(${rateResult.data})`);
      }

      const energyResult = await queryRule("energy_required", "Watts");
      if (energyResult?.data) {
        const estimatedCost = rate ? rate * KW_PER_HOUR_COST : 0;
        setCost(estimatedCost);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-5 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
      <div className="absolute flex items-center justify-center opacity-20">
        <span className="flex max-h-full max-w-full items-center justify-center"></span>
        <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
      </div>
      <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
        WattsUp
      </h1>
      <div className="flex items-center justify-center mb-6">
        <Image src="/logo-nobg.png" alt="WattsUp Logo" width={150} height={50} priority />
      </div>
      { car ? 
        <div className='flex items-center flex-col justify-center'>
          <p>Vehículo seleccionado</p>
          <h2>{car.model_name}</h2>
          <Image src={car?.image_url} alt={car?.model_name} width={200} height={200} />
        </div>
        :<p>Selecciona un vehículo</p>
      }
      
      
      <div className="flex flex-col items-center gap-4 p-4">
        {car ? <>
          <IconValue Icon={FaBatteryFull} label="Capacidad de batería" value={car.battery_capacity + 'kWh'} />
          <IconValue Icon={FaCalendarPlus} label="Años de antigüedad" value={`${calculateCarAge(car.launch_date)} años`} />
          </> : null}
        <label htmlFor="slider" className="text-white/75 font-small">
          Selecciona un tiempo de carga estimado:
        </label>
        <input
          id="slider"
          type="range"
          min="0"
          max="10"
          step="1"
          value={duration}
          onChange={handleSliderChange}
          className="w-64 h-2 bg-gray-300 rounded-lg cursor-pointer focus:outline-none"
        />
        <div className="flex flex-row">
          <div className="max-w-[40ch] max-w-[32ch] flex-1">
            <Badge value={rate} label="Rate" />
          </div>
          <div className=" ml-2 max-w-[40ch] max-w-[200px]">
            <Badge value={cost} label="Costo estimado" />
          </div>
        </div>
      </div>
    </div>
  );
}