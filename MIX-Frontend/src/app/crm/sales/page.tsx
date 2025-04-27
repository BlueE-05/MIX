'use client'
import { useEffect, useState } from 'react';
//endpoint
import { HTTPURL } from '@/constants/utils';
import RoundedButton from "@/components/Buttons/RoundedButton";
import CustomTable from "@/components/Tables/CustomTable";
import { CirclePlus } from "lucide-react";
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import Formulario from '@/components/Forms/SalesForms';
import SaleDetailCard from '@/components/Cards/Tables/SaleDetailCard';

interface SaleFromAPI {
  SaleID: number;
  EnterpriseName: string;
  Total: number | null;
  Status: string;
  CreationDate: string;
}

interface SaleFormData {
  contact: string;
  status: string;
  startDate: Date | null;
}

interface SaleRow {
  id: number;
  refNumber: string;
  enterprise: string;
  amount: string;
  status: React.ReactNode;
  creationDate: string;
  actions: React.ReactNode;
}

export default function SalesPage() {
  const salesHeaders = ["#", "RefNumber", "Enterprise", "$", "Status", "Creation Date", ""];
  const [salesData, setSalesData] = useState<SaleRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState<SaleRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Prospecting':
        return { bg: 'bg-orange-100', text: 'text-orange-800' };
      case 'Initial Contact':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case 'Proposal':
        return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'Negotiation':
        return { bg: 'bg-purple-100', text: 'text-purple-800' };
      case 'Closing':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'Cancelled':
        return { bg: 'bg-red-100', text: 'text-red-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const  iduser= 'ana.gomez@empresa.com'; //Cambiar para el usuario que se va a consultar

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${HTTPURL}/sale/AllSales`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiData: SaleFromAPI[] = await response.json();
        
        const transformedData = apiData.map(sale => {
          const { bg, text } = getStatusColor(sale.Status);
          
          return {
            id: sale.SaleID,
            refNumber: `#${sale.SaleID}`,
            enterprise: sale.EnterpriseName,
            amount: sale.Total ? `$${sale.Total.toFixed(2)}` : '$0.00',
            status: (
              <span
                key={`status-${sale.SaleID}`}
                className={`px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
              >
                {sale.Status}
              </span>
            ),
            creationDate: new Date(sale.CreationDate).toLocaleDateString("en-US"),
            actions: <ArrowRightButton 
                       color='#0C43A8'
                       key={`arrow-${sale.SaleID}`} 
                       onClick={() => setSelectedSale({
                         id: sale.SaleID,
                         refNumber: `#${sale.SaleID}`,
                         enterprise: sale.EnterpriseName,
                         amount: sale.Total ? `$${sale.Total.toFixed(2)}` : '$0.00',
                         status: sale.Status,
                         creationDate: new Date(sale.CreationDate).toLocaleDateString("en-US"),
                         actions: <ArrowRightButton />
                       })}
                     />,
          };
        });
        
        setSalesData(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching sales:", err);
        setError("Failed to load sales data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, []);

  const handleNewSale = (newSaleData: SaleFormData) => {
    const newId = salesData.length > 0 ? Math.max(...salesData.map(s => s.id)) + 1 : 1;
    const { bg, text } = getStatusColor(newSaleData.status || 'Prospecting');

    const newSale: SaleRow = {
      id: newId,
      refNumber: `#${newId}`,
      enterprise: newSaleData.contact || "N/A",
      amount: "$0.00",
      status: (
        <span
          key={`status-${newId}`}
          className={`px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
        >
          {newSaleData.status || 'Prospecting'}
        </span>
      ),
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
    sale.creationDate,
    sale.actions,
  ]);

  if (isLoading) {
    return (
      <main className="min-h-screen p-6 flex items-center justify-center">
        <div>Loading sales data...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      {/* Title */}
      <h1 className="font-bold text-3xl mb-5">Active Sales</h1>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Sales Table */}
      <CustomTable 
        headers={salesHeaders} 
        data={salesDataForTable} 
        color="#0C43A8"
        
      />

      {/* Modal Form */}
      {showForm && (
        <Formulario
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            const adaptedData = {
              ...data,
              startDate: null,   
            };
            handleNewSale(adaptedData);
          }}
        />
      )}

      {/* Tarjeta de detalles de la venta */}
      {selectedSale && (
        <SaleDetailCard
          sale={{
            ...selectedSale,
            status: selectedSale.status
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