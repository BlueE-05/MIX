import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BoxClosed() {
  const [cierres, setCierres] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const iduser = 3; // Ajusta esto dinámicamente si lo necesitas

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
    <main className="">
      <div className="w-50 h-50 flex flex-col items-center justify-center rounded-2xl p-4 text-center">
        <p className="text-lg font-semibold">Closed this month</p>
        <p className="text-8xl font-bold mt-2">{renderCierres()}</p>
        <p className="text-lg font-semibold">Sales</p>
      </div>
    </main>
  );
}



/*
export default function BoxClosed() {
    return (
        <main className="">
            <div className="w-50 h-50 flex flex-col items-center justify-center rounded-2xl p-4">
                <p className="text-lg font-semibold">Closed this month</p>
                <p className="text-8xl font-bold mt-2">50</p>
                <p className="text-lg font-semibold">Sales</p>
            </div>
        </main> 
    );
  }
*/

  