'use client';
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { url } from "@/utils/constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
  Fecha: string;
  VentasCerradas: number;
  DiaDelMes: number;
  DiaSemana: string;
  Equipo: string;
}

interface LinesChartProps {
  compareUserEmail?: string | null;
}

export default function LinesChartReport({ compareUserEmail }: LinesChartProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<number[]>([]);
  const [closedSales, setClosedSales] = useState<number[]>([]);
  const [comparedData, setComparedData] = useState<{
    days: number[];
    closedSales: number[];
  } | null>(null);
  const [comparedLoading, setComparedLoading] = useState(false);
  const [comparedError, setComparedError] = useState<string | null>(null);

  const fetchMainData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/report/DailyClosedSalesByTeam`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error('Error loading main data');
      }
      
      const data: SaleData[] = await response.json();
      
      const daysArray = data.map(item => item.DiaDelMes);
      const salesArray = data.map(item => item.VentasCerradas);
      
      setDays(daysArray);
      setClosedSales(salesArray);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setLoading(false);
    }
  };

  const fetchComparedData = async (email: string) => {
    try {
      setComparedLoading(true);
      setComparedError(null);
      
      const response = await fetch(`${url}/report/DailyClosedSalesByUser?email=${encodeURIComponent(email)}`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error('Error loading compared data');
      }
      
      const data: SaleData[] = await response.json();
      
      const daysArray = data.map(item => item.DiaDelMes);
      const salesArray = data.map(item => item.VentasCerradas);
      
      setComparedData({
        days: daysArray,
        closedSales: salesArray
      });
      setComparedLoading(false);
    } catch (err) {
      setComparedError(err instanceof Error ? err.message : 'Error desconocido al cargar datos de comparación');
      setComparedLoading(false);
    }
  };

  useEffect(() => {
    fetchMainData();
  }, []);

  useEffect(() => {
    if (compareUserEmail) {
      fetchComparedData(compareUserEmail);
    } else {
      setComparedData(null);
    }
  }, [compareUserEmail]);

  const chartData = {
    labels: days,
    datasets: [
      {
        label: 'Ventas del Equipo',
        data: closedSales,
        tension: 0.4,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2
      },
      ...(comparedData ? [{
        label: `Ventas de ${compareUserEmail}`,
        data: comparedData.closedSales,
        tension: 0.4,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        borderDash: [5, 5]
      }] : [])
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0, // Fuerza comenzar desde 0
        max: Math.max(...closedSales) * 1.1, // Establece el máximo como 10% más que el valor más alto
        ticks: {
          stepSize: calculateStepSize(Math.max(...closedSales)), // Calcula un stepSize adecuado
          callback: function(value: number) {
            return Number.isInteger(value) ? value.toString() : ''; // Solo muestra valores enteros
          }
        },
        title: {
          display: true,
          text: 'Ventas Cerradas'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Días del Mes'
        }
      }
    },
    plugins: {
      // ... (mantén el resto de configuraciones igual)
    }
  };
  
  // Función auxiliar para calcular un stepSize adecuado
  function calculateStepSize(maxValue: number): number {
    if (maxValue <= 10) return 1;
    if (maxValue <= 50) return 5;
    if (maxValue <= 100) return 10;
    if (maxValue <= 500) return 50;
    if (maxValue <= 1000) return 100;
    return Math.ceil(maxValue / 10);
  }
      

  if (loading) {
    return <div className="text-white text-center py-8">Cargando datos de ventas...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  if (days.length === 0 || closedSales.length === 0) {
    return <div className="text-gray-400 text-center py-8">No hay datos de ventas disponibles</div>;
  }

  
}