import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LinesChartProps {
  salesData: number[];
  reportType: 'team' | 'individual';
  daysofMonth?: string[];
}

/**
 * Formatea una fecha ISO a un string corto (dd/mm)
 * @param dateString - Fecha en formato ISO string
 * @returns String en formato dd/mm
 */
const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString; // Si no es una fecha válida, devolver el string original
  }
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  return `${day}/${month}`;
};

export default function LinesChart({ salesData, reportType, daysofMonth }: LinesChartProps) {
  const [days, setDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Usar days del estado o el prop daysofMonth si está disponible
  const labels = daysofMonth || days;

  const data = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: salesData,
        borderColor: reportType === 'team' ? 'rgb(75, 192, 192)' : 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
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

  if (loading && !daysofMonth) {
    return <div>Cargando días del mes...</div>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
}