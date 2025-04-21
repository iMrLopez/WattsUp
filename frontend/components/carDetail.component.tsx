import Car from "../models/car.interface";

import { FaBatteryFull, FaCalendarPlus } from "react-icons/fa";
import IconValue from "./iconValue.component";
import Image from "next/image";
import calculateCarAge from "../utils/calculateCarAge";

export default function CarDetailComponent({ car }: { car: Car }) {
  return (
    <div className="after:content relative mb-5 flex flex flex-col flex-col items-center items-center justify-end justify-center gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-5 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
      <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
        Vehículo seleccionado
      </h1>
      <Image
        src={car?.image_url}
        alt={car?.model_name}
        width={200}
        height={200}
      />
      <h2>{car.model_name}</h2>
      <>
        <IconValue
          Icon={FaBatteryFull}
          label="Capacidad de batería"
          value={car.battery_capacity + "kWh"}
        />
        <IconValue
          Icon={FaCalendarPlus}
          label="Años de antigüedad"
          value={`${calculateCarAge(car.launch_date)} años`}
        />
      </>
    </div>
  );
}
