import React from "react";

interface BadgeProps {
  value: number;
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg h-full">
      <p className="font-bold text-black">
        {label === "Costo estimado" ? "₡" : ""}
        {Number(value).toFixed(2)}
      </p>
      <p className="text-m text-gray-800">{label}</p>
    </div>
  );
};
