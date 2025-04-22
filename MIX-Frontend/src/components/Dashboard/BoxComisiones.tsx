'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface BoxComisionesProps {
  comisiones?: number;
  justify?: string;
}

export default function BoxComisiones({ comisiones, justify }: BoxComisionesProps = {}) {
  // Valor por defecto si no se pasa la prop
  //const amount = comisiones ?? 12500;
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
    } else if (comision === 0) {
      return 'No commissions';
    } else if (comision !== null) {
      // Redondear a 2 decimales
      return typeof comision === 'number' 
        ? comision.toFixed(2) 
        : parseFloat(comision).toFixed(2);
    } else {
      return 'Error loading';
    }
  };
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Commissions</h3>
      <p className={`text-3xl font-bold text-green-600 ${justify}`}>{renderComision()}</p>
    </div>
  );
}