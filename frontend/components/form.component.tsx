import Car from "../models/Car.interface";
import Image from "next/image";

interface FormComponentProps {
  car?: Car;
}

export default function FormComponent({ car }: FormComponentProps) {
  return (
    <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <span className="flex max-h-full max-w-full items-center justify-center"></span>
        <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
      </div>
      <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
        WattsUp
      </h1>
      <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
        {car ? `You selected the ${car.model_name}` : "Select a car"}
      </p>
    </div>
  );
}
