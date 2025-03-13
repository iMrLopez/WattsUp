import Car from "../models/Car.interface";
import Image from "next/image";
import React from "react";
import { addFact, queryRule } from "../services/apiService";

interface FormComponentProps {
  car?: Car;
}
const KW_PER_HOUR_COST = 64.5;

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
    <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
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
      <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
        {car ? `You selected the ${car.model_name}` : "Select a car"}
      </p>
      <div className="flex flex-col items-center gap-4 p-4">
        {car ? <><label className="text-white/75 font-small">
          Battery Capacity: {car.battery_capacity}kWh
        </label> <label className="text-white/75 font-small">
            Age: {car.acceleration_0_100}
          </label></> : null}
        <label htmlFor="slider" className="text-white/75 font-small">
          Charging time (Hours): {duration}
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
        <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
          {rate && `Charging Rate ${rate}`}
        </p>

        <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
          {cost && `Estimated Cost ₡${cost}`}
        </p>
      </div>
    </div>
  );
}