'use client'
import { useEffect, useState } from 'react';
import RoundedButton from "@/components/Buttons/RoundedButton";
import CustomTable from "@/components/Tables/CustomTable";
import { CirclePlus } from "lucide-react";
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";

export default function SalesPage() {
  const salesHeaders = [
    "RefNumber", 
    "$", 
    "Status", 
    "Last Contact", 
    "Closing Date", 
    "Creation Date", 
    ""
  ];

  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Generación de datos de ejemplo para la tabla
    const data = Array.from({ length: 25 }, (_, i) => {
      const refNumber = `REF-${10000 + i}`;
      const amount = (Math.random() * 5000 + 500).toFixed(2); // Generar una cantidad aleatoria entre 500 y 5500
      const statusOptions = ["Closed", "In Progress", "Pending"];
      const status = statusOptions[i % 3]; // Alternar entre los estados
      const lastContact = new Date(2025, 2, (i % 28) + 1).toLocaleDateString("en-US");
      const closingDate = new Date(2025, 2, (i % 28) + 10).toLocaleDateString("en-US");
      const creationDate = new Date(2025, 1, (i % 28) + 1).toLocaleDateString("en-US");

      // Devolver la fila como un arreglo de React nodes
      return [
        refNumber,
        `$${amount}`,
        status,
        lastContact,
        closingDate,
        creationDate,
        <ArrowRightButton key={i} /> // Agregar el botón de la flecha
      ];
    });

    setSalesData(data);
  }, []);

  return (
    <main className="min-h-screen p-6">
      <h1 className="font-bold text-3xl mb-5">Active Sales</h1>
      <CustomTable headers={salesHeaders} data={salesData} color="green" />
      <div className="fixed bottom-6 right-6">
        <RoundedButton color="green" text="New Sale" Icon={CirclePlus} link="/crm/sales/newsale" />
      </div>
    </main>
  );
}