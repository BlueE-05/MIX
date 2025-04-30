
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '@/utils/constants';

interface BoxClosedProps {
  closedDeals?: number;
  numberSize?: string;
}

export default function BoxClosed({ closedDeals, numberSize = 'text-3xl' }: BoxClosedProps) {
  const [cierres, setCierres] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (closedDeals !== undefined) {
      setCierres(closedDeals);
      setLoading(false);
      return;
    }
    axios
      .get(`${url}/report/allCierre`, {
        withCredentials: true,
      })
      .then((response) => {
        setCierres(Number(response.data[0]?.TotalCierre || 0));
      })
      .catch((error) => {
        console.error('Error al obtener cierres:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [closedDeals]);

  return (
    <div className="p-4 items-center text-center">
      <h3 className={`text-lg font-semibold mb-2 ${numberSize}`}>Closed Sales</h3>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading data...</div>
      ) : cierres === 0 ? (
        <div className="text-center py-8 text-gray-500">No yet</div>
      ) : cierres !== null ? (
        <div className={`text-3xl font-bold text-blue-600`}>{cierres}</div>
      ) : (
        <div className="text-red-700 px-4 py-3">Error loading data...</div>
      )}
    </div>
  );
}