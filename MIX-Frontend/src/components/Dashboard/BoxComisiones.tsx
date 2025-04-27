'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
//endpoint
import { HTTPURL } from '@/constants/utils';



interface BoxComisionesProps {
  comisiones?: number;
  justify?: string;
}

export default function BoxComisiones({ comisiones, justify }: BoxComisionesProps = {}) {
  
  const [comision, setComision] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const iduser = 'ana.gomez@empresa.com'; // CAMBIAR ESTA VARIABLE DE ACUERDO AL USUARIO ACTUAL

  useEffect(() => {
    axios.get(`${HTTPURL}/report/comisTotal`)
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
  },);

 

  const renderComision = () => {
    if (loading) {
      return <div className="text-center py-8 text-gray-500">Loading data...</div>;
    } else if (comision === 0) {
      return <div className="text-center py-8 text-gray-500">No commissions</div>;
    } else if (comision !== null) {
      return (
        <div className={`text-3xl font-bold text-blue-600 ${justify}`}> $ 
        {typeof comision === 'number' ? comision.toFixed(2) : comision}
      </div>
      );
    } else {
      return <div className="text-red-700 px-4 py-3">Error loading data...</div>;
    }
  };
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Commissions</h3>
      {renderComision()}
    </div>
  );
}