'use client';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  distribution?: number[];
  compact?: boolean; // Nueva prop para modo compacto
}

export default function PieChart({ distribution, compact = false }: PieChartProps = {}) {
  const defaultData = [35, 25, 20, 15, 5];
  const data = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Others'],
    datasets: [{
      data: distribution || defaultData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ],
      borderWidth: 1,
    }],
  };

  return (
    <div className={`w-full ${compact ? 'h-[250px]' : 'h-full min-h-[300px]'} flex items-center justify-center`}>
      <Pie 
        data={data} 
        className="w-full h-full"
      />
    </div>
  );
}