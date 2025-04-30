'use client';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useUserSalesInfo } from '@/hooks/useUserSaleInfo';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  compact?: boolean;
  isAdmin?: boolean;
  selectedUserEmail?: string;
  distribution?: number[];
}

const chartColors = [
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(75, 192, 192, 0.7)',
];

export default function PieChartReport({
  compact = false,
  isAdmin = false,
  selectedUserEmail,
  distribution,
}: Props = {}) {
  const { cerradas, activas, canceladas, loading, error } = useUserSalesInfo(
    isAdmin && selectedUserEmail ? selectedUserEmail : undefined
  );
  

  const dataArray = distribution ?? [canceladas, activas, cerradas];

  const chartData = {
    labels: ['Canceladas', 'Activas', 'Cerradas'],
    datasets: [
      {
        label: 'Distribución de ventas',
        data: dataArray,
        backgroundColor: chartColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: 'top' as const,
      },
    },
  };

  if (loading)
    return (
      <div className={`w-full ${compact ? 'h-[250px]' : 'min-h-[300px]'} flex items-center justify-center`}>
        <p className="text-gray-500">Cargando distribución...</p>
      </div>
    );

  if (error)
    return (
      <div className={`w-full ${compact ? 'h-[250px]' : 'min-h-[300px]'} flex items-center justify-center`}>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className={`w-full ${compact ? 'h-[250px]' : 'min-h-[300px]'} flex items-center justify-center`}>
      <Pie data={chartData} options={options} />
    </div>
  );
}
