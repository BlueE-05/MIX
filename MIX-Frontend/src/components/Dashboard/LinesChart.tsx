<<<<<<< HEAD
import React from "react";
import { Line } from "react-chartjs-2";
=======
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
//endpoint
import { HTTPURL } from "@/constants/utils";

>>>>>>> origin/pruebanewmerge_sales_report
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
<<<<<<< HEAD
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
}

export default function LinesChart({ salesData, reportType }: LinesChartProps) {
  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Sales',
        data: salesData,
        borderColor: reportType === 'team' ? 'rgb(75, 192, 192)' : 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
=======
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
        const response = await fetch(`${HTTPURL}/report/ClosedDayUser`);
        
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
>>>>>>> origin/pruebanewmerge_sales_report
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

<<<<<<< HEAD
  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
=======
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
>>>>>>> origin/pruebanewmerge_sales_report
    </div>
  );
}