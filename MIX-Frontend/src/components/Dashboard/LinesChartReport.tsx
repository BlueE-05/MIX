import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
//endpoint
import { HTTPURL } from "@/constants/utils";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SaleData {
  Fecha: string;
  VentasCerradas: number;
  DiaDelMes: number;
  DiaSemana: string;
  Equipo: string;
}

export default function LinesChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<number[]>([]);
  const [closedSales, setClosedSales] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${HTTPURL}/report/DailyClosedSalesByTeam`);
        
        if (!response.ok) {
          throw new Error('Error loading data');
        }
        
        const data: SaleData[] = await response.json();
        
        
        const daysArray = data.map(item => item.DiaDelMes);
        const salesArray = data.map(item => item.VentasCerradas);
        
        setDays(daysArray);
        setClosedSales(salesArray);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const chartData = {
    labels: days,
    datasets: [
      {
        label: 'Closed Sales',
        data: closedSales,
        tension: 0.1,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  if (loading) {
    return <div className="text-white text-center py-8">Cargando datos de ventas...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  if (days.length === 0 || closedSales.length === 0) {
    return <div className="text-gray-400 text-center py-8">No hay datos de ventas disponibles</div>;
  }

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
}