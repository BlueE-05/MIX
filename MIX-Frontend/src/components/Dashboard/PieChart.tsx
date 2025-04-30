'use client';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { url } from '@/utils/constants';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  distribution?: number[];
  compact?: boolean;
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context: any) {
          const label = context.label || '';
          const value = context.raw || 0;
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${value} (${percentage}%)`;
        }
      }
    },
    legend: {
      position: 'top' as const,
    },
  },
};

const initialData = {
  labels: ['Cancelled', 'Active', 'Closed'],
  datasets: [
    {
      label: 'Total',
      data: [0, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart({ distribution, compact = false }: Props = {}) {
  const [chartData, setChartData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [cierreRes, activeRes, cancelRes] = await Promise.all([
          axios.get(`${url}/report/allCierre`, { withCredentials: true }),
          axios.get(`${url}/report/allActive`, { withCredentials: true }),
          axios.get(`${url}/report/allCancelled`, { withCredentials: true }),
        ]);

        const cierre = cierreRes.data[0]?.TotalCierre || 0;
        const active = activeRes.data[0]?.Active || 0;
        const cancelled = cancelRes.data[0]?.TotalCancelled || 0;

        const final = distribution || [cancelled, active, cierre];

        const newData = {
          ...initialData,
          datasets: [{
            ...initialData.datasets[0],
            data: final,
          }],
        };

        setChartData(newData);
        setLoading(false);
      } catch (err) {
        setError('Error loading data...');
        setLoading(false);
      }
    };
    fetchAllData();
  }, [distribution]);

  if (loading) return <div className={`w-full ${compact ? 'h-[250px]' : 'h-full min-h-[300px]'} flex items-center justify-center`}><p className="text-gray-500">Loading data...</p></div>;
  if (error) return <div className={`w-full ${compact ? 'h-[250px]' : 'h-full min-h-[300px]'} flex items-center justify-center`}><p className="text-red-700">{error}</p></div>;

  return (
    <div className={`w-full ${compact ? 'h-[250px]' : 'h-full min-h-[300px]'} flex items-center justify-center`}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}