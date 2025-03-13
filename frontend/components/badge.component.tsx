import React from "react";

interface BadgeProps {
  value: number;
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
      <p className="font-bold text-black">
        {label === "Costo estimado" ? "₡" : ""}
        {value.toFixed(2)}
      </p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};
