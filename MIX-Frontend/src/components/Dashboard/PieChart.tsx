'use client';
<<<<<<< HEAD
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
=======
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from 'axios';
//endpoint
import { HTTPURL } from "@/constants/utils";
>>>>>>> origin/pruebanewmerge_sales_report

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  distribution?: number[];
<<<<<<< HEAD
  compact?: boolean; // Nueva prop para modo compacto
}

export default function PieChart({ distribution, compact = false }: PieChartProps = {}) {
  const defaultData = [35, 25, 20, 15, 5];
  const data = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Others'],
    datasets: [{
      data: distribution || defaultData,
=======
  compact?: boolean;
}

const options = {
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
    }
  }
};

// Datos iniciales para la gráfica
const initialData = {
  labels: ['Cancelled', 'Active', 'Closed'],
  datasets: [
    {
      label: 'Total',
      data: [0, 0, 0],
>>>>>>> origin/pruebanewmerge_sales_report
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
<<<<<<< HEAD
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
=======
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart({ distribution, compact = false }: PieChartProps = {}) {
  const [chartData, setChartData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        
        
        const [cierreResponse, activeResponse, prospectoResponse] = await Promise.all([
          axios.get(`${HTTPURL}/report/allCierre`),
          axios.get(`${HTTPURL}/report/allActive`),
          axios.get(`${HTTPURL}/report/allCancelled`)
        ]);

        // Extraer los datos de las respuestas
        const cierreData = cierreResponse.data[0]?.TotalCierre || 0;
        const activeData = activeResponse.data[0]?.Active || 0;
        const cancelledData = prospectoResponse.data[0]?.TotalCancelled || 0;

        // Usar los datos de distribution si vienen por props, sino usar los del API
        const finalData = distribution || [cancelledData, activeData, cierreData];

        const newData = {
          ...initialData,
          datasets: [
            {
              ...initialData.datasets[0],
              data: finalData
            }
          ]
        };
        
        setChartData(newData);
        setLoading(false);
      } catch (err) {
        setError('Error loading data...');
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [distribution]);

  if (loading) {
    return (
      <div className={`w-full ${compact ? 'h-[250px]' : 'h-full min-h-[300px]'} flex items-center justify-center`}>
        <p className="text-center py-8 text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full ${compact ? 'h-[250px]' : 'h-full min-h-[300px]'} flex items-center justify-center`}>
        <p className="text-red-700 px-4 py-3">{error}</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${compact ? 'h-[250px]' : 'h-full min-h-[300px]'} flex items-center justify-center`}>
      <Pie data={chartData} options={options} />
>>>>>>> origin/pruebanewmerge_sales_report
    </div>
  );
}