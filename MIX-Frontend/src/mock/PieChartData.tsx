import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PiechartData() {
  const [chartData, setChartData] = useState({
    labels: ['Prospecto', 'Cotización', 'Cierre'],
    datasets: [{
      label: 'Ventas',
      data: [0, 0, 0], // Valor inicial para "Cierre" es 0
      backgroundColor: [
        'rgba(0, 255, 0, 0.5)',  // Verde para Prospecto
        'rgba(255, 99, 132, 0.5)', // Rojo para Cotización
        'rgba(255, 255, 0, 0.5)'   // Amarillo para Cierre
      ],
      borderColor: [
        'rgb(0, 255, 0)',
        'rgb(255, 99, 132)',
        'rgb(255, 255, 0)'
      ]
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/report/allCierre/1');
        const { cierre } = await response.json();
        console.log(cierre);
        
        setChartData(prev => ({
          ...prev,
          datasets: [{
            ...prev.datasets[0],
            data: [30, 4, cierre] // Mantén Prospecto y Cotización fijos, actualiza Cierre
          }]
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <Pie data={chartData} />;
}




/*
const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const data = {
  labels: ['Prospecto', 'Cotizacion', 'Cierre'],
  datasets: [
    {
      label: 'Total',
      data: [30, 4, 16],
      backgroundColor: [
        'rgba(0,255,0,0.5)',
        'rgba(255,99,132,0.5)',
        'rgba(255,255,0,0.5)',
      ],
      borderColor: [
        'rgb(0,255,0)',
        'rgb(255,99,132)',
        'rgb(255,255,0)',
      ],
    },
  ],
};

export default function PiechartData() {
  return <Pie data={data} options={options} />;
}
  */