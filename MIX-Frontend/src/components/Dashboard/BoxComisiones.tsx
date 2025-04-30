'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '@/utils/constants';

interface Props {
  comisiones?: number;
  numberSize?: string;
}

export default function BoxComisiones({ comisiones, numberSize = 'text-3xl' }: Props) {
  const [comision, setComision] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (comisiones !== undefined) {
      setComision(comisiones);
      setLoading(false);
      return;
    }
    axios
      .get(`${url}/report/comisTotal`, { withCredentials: true })
      .then((res) => setComision(Number(res.data[0]?.TotalCommission || 0)))
      .catch((err) => console.error('Error al obtener comisión:', err))
      .finally(() => setLoading(false));
  }, [comisiones]);

  const getTextSize = (amount: number) => {
    const len = Math.floor(amount).toString().length;
    if (len <= 5) return 'text-3xl';
    if (len === 6) return 'text-2xl';
    if (len === 7) return 'text-xl';
    if (len === 8) return 'text-lg';
    return 'text-base';
  };

  return (
    <div className="p-4 items-center text-center">
      <h3 className={`text-lg font-semibold mb-2 ${numberSize}`}>Commissions</h3>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading data...</div>
      ) : comision === 0 ? (
        <div className="text-center py-8 text-gray-500">No commissions</div>
      ) : comision !== null ? (
        <div className={`${getTextSize(comision)} font-bold text-green-600 break-words`}>
          ${comision.toFixed(2)}
        </div>
      ) : (
        <div className="text-red-700 px-4 py-3">Error loading data...</div>
      )}
    </div>
  );
}