'use client'
import { useEffect, useState } from 'react';
import RoundedButton from "@/components/Buttons/RoundedButton";
import CustomTable from "@/components/Tables/CustomTable";
import { CirclePlus } from "lucide-react";
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import Formulario from '@/components/Forms/SalesForms';
import SaleDetailCard from '@/components/Cards/Tables/SaleDetailCard';

interface SaleFormData {
  contact: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface SaleRow {
  id: number;
  refNumber: string;
  enterprise: string;
  amount: string;
  status: React.ReactNode;
  lastContact: string;
  closingDate: string;
  creationDate: string;
  actions: React.ReactNode;
}

export default function SalesPage() {
  const salesHeaders = ["#", "RefNumber", "Enterprise", "$", "Status", "Last Contact", "Closing Date", "Creation Date", ""];
  const [salesData, setSalesData] = useState<SaleRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState<SaleRow | null>(null);

  useEffect(() => {
    // Simulación de datos de ventas
    const sampleSales: SaleRow[] = Array.from({ length: 10 }, (_, i) => {
      const statusOptions = ["Closed", "In Progress", "Pending"];
      const status = statusOptions[i % 3];
      const color = status === "Closed" ? "green" : status === "In Progress" ? "blue" : "yellow";

      return {
        id: i + 1,
        refNumber: `REF-${1000 + i}`,
        enterprise: `Company ${i + 1}`,
        amount: `$${(Math.random() * 5000 + 500).toFixed(2)}`,
        status: (
          <span
            key={`status-${i}`}
            className={`px-2 py-1 rounded-full text-xs font-medium 
              ${color === 'green' ? 'bg-green-100 text-green-800' :
                color === 'blue' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'}`}>
            {status}
          </span>
        ),
        lastContact: new Date(2025, 2, (i % 28) + 1).toLocaleDateString("en-US"),
        closingDate: new Date(2025, 2, (i % 28) + 10).toLocaleDateString("en-US"),
        creationDate: new Date(2025, 1, (i % 28) + 1).toLocaleDateString("en-US"),
        actions: <ArrowRightButton color='#0C43A8'
                  key={`arrow-${i}`} 
                  onClick={() => {
                    // 3. Asignar el sale seleccionado al hacer click
                    setSelectedSale({
                      id: i + 1,
                      refNumber: `REF-${1000 + i}`,
                      enterprise: `Company ${i + 1}`,
                      amount: `$${(Math.random() * 5000 + 500).toFixed(2)}`,
                      status: status,
                      lastContact: new Date(2025, 2, (i % 28) + 1).toLocaleDateString("en-US"),
                      closingDate: new Date(2025, 2, (i % 28) + 10).toLocaleDateString("en-US"),
                      creationDate: new Date(2025, 1, (i % 28) + 1).toLocaleDateString("en-US"),
                      actions: <ArrowRightButton />
                    });
                  }}
                />,
      };
    });

    setSalesData(sampleSales);
  }, []);

  const handleNewSale = (newSaleData: SaleFormData) => {
    const newId = salesData.length + 1;
    const color = newSaleData.status === "Accepted" ? "green" :
      newSaleData.status === "Cancelled" ? "red" : "yellow";

    const newSale: SaleRow = {
      id: newId,
      refNumber: `REF-${1000 + newId}`,
      enterprise: newSaleData.contact || "N/A",
      amount: "$0.00",
      status: (
        <span
          key={`status-${newId}`}
          className={`px-2 py-1 rounded-full text-xs font-medium 
            ${color === 'green' ? 'bg-green-100 text-green-800' :
              color === 'red' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'}`}>
          {newSaleData.status || 'Pending'}
        </span>
      ),
      lastContact: new Date().toLocaleDateString("en-US"),
      closingDate: newSaleData.endDate?.toLocaleDateString("en-US") || "-",
      creationDate: newSaleData.startDate?.toLocaleDateString("en-US") || new Date().toLocaleDateString("en-US"),
      actions: <ArrowRightButton key={`arrow-${newId}`} />,
    };

    setSalesData([...salesData, newSale]);
    setShowForm(false);
  };

  const salesDataForTable: React.ReactNode[][] = salesData.map(sale => [
    sale.id,
    sale.refNumber,
    sale.enterprise,
    sale.amount,
    sale.status,
    sale.lastContact,
    sale.closingDate,
    sale.creationDate,
    sale.actions,
  ]);

  return (
    <main className="min-h-screen p-6">
      {/* Title */}
      <h1 className="font-bold text-3xl mb-5">Active Sales</h1>

      {/* Sales Table */}
      <CustomTable headers={salesHeaders} data={salesDataForTable} color="#0C43A8" />

      {/* Modal Form */}
      {showForm && (
        <Formulario
          onClose={() => setShowForm(false)}
          onSubmit={handleNewSale}
        />
      )}

      {/* Tarjeta de detalles de la venta */}
      {selectedSale && (
        <SaleDetailCard
          sale={{
            ...selectedSale,
            status: selectedSale.status // Pasa el status como está
          }}
          onClose={() => setSelectedSale(null)}
        />
      )}

      {/* New Sale Button */}
      <div className="fixed bottom-6 right-6">
        <div onClick={() => setShowForm(true)} className='cursor-pointer'>
          <RoundedButton color="#0C43A8" text="New Sale" Icon={CirclePlus} />
        </div>
      </div>
    </main>
  );
}
