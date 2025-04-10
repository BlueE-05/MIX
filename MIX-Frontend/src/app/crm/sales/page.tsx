'use client'
import { useEffect, useState } from 'react';
import RoundedButton from "@/components/Buttons/RoundedButton";
import CustomTable from "@/components/Tables/CustomTable";
import { CirclePlus } from "lucide-react";
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import Formulario from '@/components/Forms/SalesForms';

interface SaleFormData {
  contact: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
}

export default function SalesPage() {
  const salesHeaders = ["RefNumber", "Enterprise", "$", "Status", "Last Contact", "Closing Date", "Creation Date", ""];

  const [salesData, setSalesData] = useState<React.ReactNode[][]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Generación de datos de ejemplo para la tabla
    const data: React.ReactNode[][] = Array.from({ length: 25 }, (_, i) => {
      const refNumber = `REF-${10000 + i}`;
      const amount = `$${(Math.random() * 5000 + 500).toFixed(2)}`;
      const statusOptions = ["Closed", "In Progress", "Pending"];
      const status = statusOptions[i % 3];
      const lastContact = new Date(2025, 2, (i % 28) + 1).toLocaleDateString("en-US");
      const closingDate = new Date(2025, 2, (i % 28) + 10).toLocaleDateString("en-US");
      const creationDate = new Date(2025, 1, (i % 28) + 1).toLocaleDateString("en-US");

      return [
        refNumber,
        amount,
        <span key={`status-${i}`} className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Closed' ? 'bg-green-100 text-green-800' :
          status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>,
        lastContact,
        closingDate,
        creationDate,
        <ArrowRightButton key={`arrow-${i}`} />
      ];
    });

    setSalesData(data);
  }, []);

  const handleNewSale = (newSaleData: SaleFormData) => {
    // Procesamos los datos del formulario
    const newRow = [
      `REF-${10000 + salesData.length}`,
      '$0.00',
      <span 
        key = {`status-${newSaleData.contact}`} // Posible necesidad de cambiar la llave, por el id
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          newSaleData.status === 'Acepted' ? 'bg-green-100 text-green-800' :
          newSaleData.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
      }`}>
        {newSaleData.status || 'Pending'}
      </span>,
      new Date().toLocaleDateString("en-US"),
      newSaleData.endDate?.toLocaleDateString("en-US") || '-',
      newSaleData.startDate?.toLocaleDateString("en-US") || new Date().toLocaleDateString("en-US"),
      <ArrowRightButton key={salesData.length} />
    ];
    
    setSalesData([...salesData, newRow]);
    setShowForm(false);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Active Sales</h1>
            <p className="text-gray-600">Manage your current sales pipeline</p>
          </div>
          
          <div className="fixed bottom-6 right-6">
            <div onClick={() => setShowForm(true)} className='cursor-pointer'>
              <RoundedButton color="#0C43A8" text="New Sale" Icon={CirclePlus} /> {/*Aqui esta el color del boton*/}
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-xl p-4 sm:p-6 overflow-visible">
          <CustomTable headers={salesHeaders} data={salesData} color="#0C43A8" /> {/*Aqui esta el color de la tabla*/}
        </div>
      </div>
      
      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl">
            <Formulario 
              onClose={() => setShowForm(false)} 
              onSubmit={handleNewSale} 
            />
          </div>
        </div>
      )}
    </main>
  );
}