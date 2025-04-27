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
  data?: number[]; // Lista de datos numéricos
  labels?: number[];
  reportType: 'team' | 'individual';
  
}

export default function LinesChart({ data, labels, reportType}: LinesChartProps) {
  const [internalLabels, setInternalLabels] = useState<number[]>([]);
  const [internalData, setInternalData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Si no se proporcionan labels o data, puedes mantener tu lógica de fetch aquí
  useEffect(() => {
    if (!labels || !data) {
      // Puedes mantener tu lógica de fetch si es necesario
      // o simplemente usar los valores por defecto
      setInternalLabels([1,2,3,4,5,6,7]);
      setInternalData([0, 0, 0, 0, 0, 0, 0]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [labels, data]);

  // Usar los props si están disponibles, de lo contrario usar el estado interno
  const chartLabels = labels || internalLabels;
  const chartDataValues = data || internalData;

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: reportType === 'team' ? 'Team sales' : 'Individual sales',
        data: chartDataValues,
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
          text: "# closed sales"
        }
      },
      y: {
        title: {
          display: true,
          text: "Days of month"
        },
        beginAtZero: true
      }
    }
  };

  if (loading && !labels && !data) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
}