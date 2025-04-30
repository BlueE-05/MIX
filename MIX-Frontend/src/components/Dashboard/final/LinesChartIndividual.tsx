'use client';

import { useDailyClosedSales } from '@/hooks/useDailyClosedSales';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

interface Props {
  email: string;
}

export default function LinesChartIndividual({ email }: Props) {
  const { data, loading, error } = useDailyClosedSales(email);
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
        label: 'Ventas cerradas (User)',
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
      x: { title: { display: true, text: 'Día del mes' } },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: (value: any) =>
            Number.isInteger(Number(value)) ? value.toString() : '',
        },
        title: { display: true, text: 'Ventas Cerradas' },
      },
    },
    plugins: { legend: { position: 'top' as const } },
  };

  if (loading) return <p className="text-center text-gray-500 py-8">Cargando datos de usuario...</p>;
  if (error) return <p className="text-center text-red-500 py-8">Error: {error}</p>;
  if (!sales.length) return <p className="text-center text-gray-400 py-8">No hay datos</p>;

  return <Line data={chartData} options={chartOptions} />;
}