import Car from "../models/Car.interface";
import Image from "next/image";

interface CarComponentProps {
  car: Car;
  onPress: Function;
}

export default function CarComponent({ car, onPress }: CarComponentProps) {
  return (
    <Image
      onClick={() => onPress(car)}
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
  );
}
