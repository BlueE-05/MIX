'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDailyClosedSales } from '@/hooks/useDailyClosedSales';

interface Props {
  selectedUserEmail?: string;
  isAdmin?: boolean;
}

export default function LinesChartReport({ selectedUserEmail, isAdmin = false }: Props) {
  const { data, loading, error } = useDailyClosedSales(
    selectedUserEmail,
    !isAdmin
  );


  const [days, setDays] = useState<number[]>([]);
  const [sales, setSales] = useState<number[]>([]);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => a.DiaDelMes - b.DiaDelMes);
    setDays(sorted.map((d) => d.DiaDelMes));
    setSales(sorted.map((d) => d.VentasCerradas));
  }, [data]);

  const chartData = {
    labels: days,
    datasets: [
      {
        label: 'Ventas cerradas',
        data: sales,
        tension: 0.3,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Día del mes' },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: (value: number | string) => {
            const num = Number(value);
            return Number.isInteger(num) ? num.toString() : '';
          },
        },
        title: { display: true, text: 'Ventas Cerradas' },
      },
    },
    plugins: {
      legend: { position: 'top' as const },
    },
  };

  if (loading) return <div className="text-center text-gray-500 py-8">Cargando datos de ventas...</div>;
  if (error) return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  if (!sales.length) return <div className="text-center text-gray-400 py-8">No hay datos disponibles</div>;

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}