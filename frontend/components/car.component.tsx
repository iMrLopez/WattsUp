import Car from "../models/Car.interface";
import Image from "next/image";
import {
  FaChair,
  FaRoad,
  FaLeaf,
  FaBalanceScale,
  FaBolt,
  FaBatteryHalf,
  FaBatteryFull,
  FaChargingStation,
  FaTruck,
  FaBoxOpen,
  FaPoundSign,
  FaCalendarPlus,
  FaCalendarTimes,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import IconValue from './iconValue.component';

interface CarComponentProps {
  car: Car;
  onPress: Function;
}


function CarInfo({ car }: { car: Car }) {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col space-y-4">
      <h2 className="text-xl font-bold">{car.model_name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <IconValue Icon={FaChair} label="Número de asientos" value={car.number_of_seats} />
        <IconValue Icon={FaRoad} label="Rango" value={car.range} />
        <IconValue Icon={FaLeaf} label="Eficiencia" value={car.efficiency} />
        <IconValue Icon={FaBalanceScale} label="Peso" value={car.weight} />
        <IconValue Icon={FaBolt} label="accel 0-100" value={car.acceleration_0_100} />
        <IconValue Icon={FaBatteryHalf} label="Alcance por carga" value={car.one_stop_range} />
        <IconValue Icon={FaBatteryFull} label="Capacidad de batería" value={car.battery_capacity} />
        <IconValue Icon={FaChargingStation} label="Carga rápida" value={car.fastcharge_speed} />
        <IconValue Icon={FaTruck} label="Capacidad de remolque" value={car.towing_capacity} />
        <IconValue Icon={FaBoxOpen} label="Volumen de carga" value={car.cargo_volume} />
        <IconValue Icon={FaPoundSign} label="Precio en UK" value={car.price_in_uk} />
        <IconValue Icon={FaCalendarPlus} label="Fecha de lanzamiento" value={car.launch_date} />
        <IconValue Icon={FaCalendarTimes} label="Fecha de discontinuación" value={car.discontinue_date} />
        {car.is_available ? (
          <IconValue Icon={FaCheckCircle} label="Disponible" value="Sí" />
        ) : (
          <IconValue Icon={FaTimesCircle} label="Disponible" value="No" />
        )}
      </div>
    </div>
  );
}

export default function CarComponent({ car, onPress }: CarComponentProps) {
  return (
    <div className="group relative cursor-pointer"         onClick={() => onPress(car)}
>
      <Image
        key={car.id}
        alt={car.model_name}
        className="mb-4 transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
        style={{ transform: "translate3d(0, 0, 0)" }}
        src={car.image_url}
        width={720}
        height={480}
        sizes="(max-width: 640px) 100vw,
               (max-width: 1280px) 50vw,
               (max-width: 1536px) 33vw,
               25vw"
      />
      <CarInfo car={car} />
    </div>
  );
}
