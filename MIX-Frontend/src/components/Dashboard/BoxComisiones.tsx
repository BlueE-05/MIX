import { useEffect, useState } from 'react';
import axios from 'axios';



export default function BoxComisiones() {
  const [comision, setComision] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const iduser = 1; // CAMBIAR ESTA VARIABLE DE ACUERDO AL USUARIO ACTUAL

  useEffect(() => {
    axios.get(`http://localhost:3001/report/totalComissions/${iduser}`)
      .then((response) => {
        console.log('Respuesta del backend:', response.data);
        const valor = response.data[0].TotalCommission;
        setComision(Number(valor));
      })
      .catch((error) => {
        console.error('Error al obtener la comisión:', error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [iduser]);

  const renderComision = () => {
    if (loading) {
      return 'Loading...';
    } else if (comision === null) {
      return 'No commissions this month';
    } else if (comision !== null) {
      return `$${comision.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    } else {
      return 'Error loading';
    }
  };

  return (
    <main className="">
      <div className="w-50 h-50 flex flex-col items-center justify-center rounded-2xl p-4 text-center">
        <p className="text-lg font-semibold">Commissions this month</p>
        <p className="text-2xl font-bold mt-2">{renderComision()}</p>
      </div>
    </main>
  );
}


  

/* Original
export default function BoxComisiones() {
    return (
        <main className="">
            <div className="w-50 h-50 flex flex-col items-center justify-center rounded-2xl p-4">
                <p className="text-lg font-semibold">Commissions this month</p>
                <p className="text-4xl font-bold mt-2">$30,000</p>
            </div>
        </main> 
    );
  }
*/
