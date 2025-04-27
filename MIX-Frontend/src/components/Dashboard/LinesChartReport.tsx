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
  salesData?: number[];
  reportType: 'team' | 'individual';
  daysofMonth?: string[];
}

interface SaleData {
    Fecha: string;
    VentasCerradas: number;
    DiaDelMes:number;
    DiaSeman: string;
  }
  

export default function LinesChart({ salesData, reportType, daysofMonth }: LinesChartProps) {
  const [days, setDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const fetchDaysOfMonth = async () => {
      try {
        setLoading(true);
          const response = await fetch(`${HTTPURL}/report/DaysMonth`);
          if (!response.ok) {
            throw new Error('Error al obtener los días del mes');
          }
          const data: SaleData[] = await response.json();
        
        // Procesar los datos como en el ejemplo
        const daysArray = data.map(item => item.DiaDelMes.toString());
        setDays(daysArray);
        setLoading(false);
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    };
    fetchDaysOfMonth();
  }, []);

  // Usar days del estado o el prop daysofMonth si está disponible
  const labels = daysofMonth || days;

  const chartDataSale = {
    labels:days,
    datasets: [
      {
        label: reportType === 'team' ? 'Team sale' : 'individual sale',
        data: salesData || chartData,
        borderColor: reportType === 'team' ? 'rgb(75, 192, 192)' : 'rgb(153, 102, 255)',
        backgroundColor: reportType === 'team' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(153, 102, 255, 0.2)',
        tension: 0.1,
        fill: true
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
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days of month'
        }
      },
      y: {
        title: {
          display: true,
          text: '# closed sales per day'
        },
        beginAtZero: true
      }
    }
  };

  if (loading && !daysofMonth) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full h-full">
      <Line data={chartDataSale} options={options} />
    </div>
  );
}