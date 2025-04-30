'use client';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { url } from '@/utils/constants';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
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
  DiaDelMes: number;
  VentasCerradas: number;
}

export default function LinesChart() {
  const [days, setDays] = useState<number[]>([]);
  const [sales, setSales] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}/report/ClosedDayUser`, { credentials: 'include' });
        if (!res.ok) throw new Error('Error al cargar datos personales');
        const data: SaleData[] = await res.json();
        const sorted = data.sort((a, b) => a.DiaDelMes - b.DiaDelMes);
        setDays(sorted.map(d => d.DiaDelMes));
        setSales(sorted.map(d => d.VentasCerradas));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: days,
    datasets: [
      {
        label: 'Mis ventas cerradas',
        data: sales,
        tension: 0.3,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: (value: number) => (Number.isInteger(value) ? value.toString() : '')
        },
        title: {
          display: true,
          text: 'Ventas Cerradas'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Día del mes'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  if (loading) return <div className="text-center text-gray-500 py-8">Cargando tus datos de ventas...</div>;
  if (error) return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  if (!sales.length) return <div className="text-center text-gray-400 py-8">No hay datos disponibles</div>;

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
