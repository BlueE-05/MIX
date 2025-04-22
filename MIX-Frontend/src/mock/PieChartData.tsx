import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const data = {
  labels: ['Closed', 'Canceled', 'Active'],
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