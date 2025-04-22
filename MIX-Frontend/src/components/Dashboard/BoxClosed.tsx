'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface BoxClosedProps {
  closedDeals?: number;
  justify?: string;
}

export default function BoxClosed({ closedDeals, justify }: BoxClosedProps = {}) {
  const [cierres, setCierres] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const iduser = 1; // Ajusta esto dinámicamente si lo necesitas

  //const deals = closedDeals ?? 42;

  useEffect(() => {
    axios.get(`http://localhost:3001/report/allCierre/${iduser}`)
      .then((response) => {
        const valor = response.data[0].TotalCierre;
        setCierres(Number(valor));
      })
      .catch((error) => {
        console.error('Error al obtener cierres:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [iduser]);

  const renderCierres = () => {
    if (loading) {
      return 'Loading...';
    } else if (cierres === 0) {
      return 'No yet';
    } else if (cierres !== null) {
      return cierres;
    } else {
      return 'Error loading';
    }
  };
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Closed Sales</h3>
      <p className={`text-3xl font-bold text-blue-600 ${justify}`}>{renderCierres()}</p>
    </div>
  );
}