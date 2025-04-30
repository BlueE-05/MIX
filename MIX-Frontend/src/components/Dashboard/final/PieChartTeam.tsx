'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  distribution: number[];
  compact?: boolean;
}

const chartColors = [
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(75, 192, 192, 0.7)',
];

export default function PieChartTeam({ distribution, compact = false }: Props) {
  const chartData = {
    labels: ['Canceladas', 'Activas', 'Cerradas'],
    datasets: [
      {
        label: 'Distribución de ventas',
        data: distribution,
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

  return (
    <div className={`w-full ${compact ? 'h-[250px]' : 'min-h-[300px]'} flex items-center justify-center`}>
      <Pie data={chartData} options={options} />
    </div>
  );
}