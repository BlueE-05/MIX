import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

//Crear gráfica de pie
const initialData = {
  labels: ['Prospecto', 'Cotizacion', 'Cierre'],
  datasets: [
    {
      label: 'Total',
      data: [0, 0, 0],
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
  const [chartData, setChartData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const userId = 1;
        
        const [cierreResponse, cotizacionResponse, prospectoResponse] = await Promise.all([
          axios.get(`http://localhost:3001/report/allCierre/${userId}`),
          axios.get(`http://localhost:3001/report/allCotizacion/${userId}`),
          axios.get(`http://localhost:3001/report/allProspecto/${userId}`)
        ]);

        // Extraer los datos de las url
        const cierreData = cierreResponse.data[0]?.TotalCierre || 0;
        const cotizacionData = cotizacionResponse.data[0]?.Total_Cotizacion || 0;
        const prospectoData = prospectoResponse.data[0]?.Total_Prospecto || 0;

        const newData = {
          ...initialData,
          datasets: [
            {
              ...initialData.datasets[0],
              data: [prospectoData, cotizacionData, cierreData] //Mostrar los datos en el gráfico
            }
          ]
        };
        
        setChartData(newData);
        setLoading(false);
      } catch (err) {

        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return <Pie data={chartData} options={options} />;
}

/*
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



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
  

/*
export default function PiechartData() {
  const [chartData, setChartData] = useState({
    labels: ['Prospecto', 'Cotización', 'Cierre'],
    datasets: [{
      label: 'Ventas',
      data: [16, 0, 0],
      backgroundColor: [
        'rgba(0, 255, 0, 0.5)',  
        'rgba(255, 99, 132, 0.5)', 
        'rgba(255, 255, 0, 0.5)'  
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
            data: [30, 4, cierre]
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
*/