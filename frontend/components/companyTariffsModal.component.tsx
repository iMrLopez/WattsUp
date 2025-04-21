// CompanyTariffsModal.tsx
import React, { useState, useEffect } from "react";
import { getCompaniesWithTariffs } from "../services/apiService";
import { Company } from "../models/car.interface";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyTariffsModalComponent: React.FC<Props> = ({
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError(null);
    getCompaniesWithTariffs()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.detail || err.message))
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-auto w-11/12 max-w-2xl overflow-hidden rounded-lg bg-black/80 shadow-lg">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Tarifas por compania registradas</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading &&
            !error &&
            data.map((company) => (
              <div key={company.companyName} className="mb-4">
                <h1 className="mb-1 font-medium">{company.companyName}</h1>
                <table className="min-w-full divide-x divide-y divide-gray-200 border">
                  <thead>
                    <tr>
                      <td className="font-semibold">Periodo</td>
                      <td className="font-semibold">Tarifa por Kwh</td>
                    </tr>{" "}
                  </thead>
                  {company.tariffs.map((t) => (
                    <tr key={t.periodName}>
                      <td className="font-semibold">{t.periodName}</td>
                      <td>₡ {t.costKwh.toFixed(2)}</td>
                    </tr>
                  ))}
                </table>
              </div>
            ))}
        </div>
        <div className="flex justify-end border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
