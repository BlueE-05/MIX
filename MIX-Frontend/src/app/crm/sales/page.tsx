'use client'
import { useEffect, useState } from 'react';
import RoundedButton from "@/components/Buttons/RoundedButton";
import CustomTable from "@/components/Tables/CustomTable";
import { CirclePlus } from "lucide-react";
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import Formulario from '@/components/Forms/SalesForms';

interface SaleFromAPI {
  SaleID: number;
  EnterpriseName: string;
  Total: number | null;
  Status: string;
  LastContact: string;
  ClosingDate: string;
  CreationDate: string;
}

interface SaleFormData {
  contact: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  saleId?: number;
}

export default function SalesPage() {
  const salesHeaders = ["RefNumber", "Enterprise", "$", "Status", "Last Contact", "Closing Date", "Creation Date", ""];

  const [salesData, setSalesData] = useState<React.ReactNode[][]>([]);
  const [originalData, setOriginalData] = useState<React.ReactNode[][]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSaleId, setLastSaleId] = useState(0);

  useEffect(() => {
    const fetchSales = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3001/sale/AllSales/1");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data: SaleFromAPI[] = await res.json();

        const maxId = Math.max(...data.map(sale => sale.SaleID), 0);
        setLastSaleId(maxId);

        const transformedData = transformData(data);
        setSalesData(transformedData);
        setOriginalData(transformedData);
      } catch (err) {
        console.error("Error fetching sales:", err);
        setError("Failed to load sales data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, []);

  const transformData = (data: SaleFromAPI[]): React.ReactNode[][] => {
    return data.map((sale) => {
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US");
      };

      return [
        `#${sale.SaleID}`,
        sale.EnterpriseName,
        sale.Total ? `$${sale.Total.toFixed(2)}` : '-',
        <span 
          key={`status-${sale.SaleID}`} 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            sale.Status === 'Cierre' ? 'bg-green-100 text-green-800' :
            'bg-blue-100 text-blue-800'
          }`}
        >
          {sale.Status}
        </span>,
        formatDate(sale.LastContact),
        formatDate(sale.ClosingDate),
        formatDate(sale.CreationDate),
        <ArrowRightButton key={`arrow-${sale.SaleID}`} />
      ];
    });
  };

  const handleEnterpriseSearch = async (enterpriseName: string) => {
    if (!enterpriseName.trim()) {
      // Si el campo está vacío, mostrar todos los datos
      setSalesData(originalData);
      return;
    }

    setIsLoading(true);
    try {
      const encodedName = encodeURIComponent(enterpriseName);
      const res = await fetch(`http://localhost:3001/sale/salebyent/${encodedName}/1`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data: SaleFromAPI[] = await res.json();
      const transformedData = transformData(data);
      setSalesData(transformedData);
    } catch (err) {
      console.error("Error searching:", err);
      setError("Failed to search sales data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSale = (newSaleData: SaleFormData) => {
    const newId = lastSaleId + 1;
    setLastSaleId(newId);
    
    const newRow = [
      `#${newId}`,
      newSaleData.contact || 'New Enterprise',
      '$0.00',
      <span 
        key={`status-${newId}`} 
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          newSaleData.status === 'Acepted' ? 'bg-green-100 text-green-800' :
          newSaleData.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}
      >
        {newSaleData.status || 'Pending'}
      </span>,
      new Date().toLocaleDateString("en-US"),
      newSaleData.endDate?.toLocaleDateString("en-US") || '-',
      newSaleData.startDate?.toLocaleDateString("en-US") || new Date().toLocaleDateString("en-US"),
      <ArrowRightButton key={newId} />
    ];
    
    const updatedData = [...originalData, newRow];
    setSalesData(updatedData);
    setOriginalData(updatedData);
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div>Loading sales data...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Active Sales</h1>
            <p className="text-gray-600">Manage your current sales pipeline</p>
          </div>
        </div>

        {/* Table with built-in search */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
          <CustomTable 
            headers={salesHeaders} 
            data={salesData} 
            color="#4209B0" 
            includeSearch={true}
            onSearch={handleEnterpriseSearch}
          />
        </div>

        {/* New Sale Button */}
        <div className="fixed bottom-6 right-6">
          <div onClick={() => setShowForm(true)} className='cursor-pointer'>
            <RoundedButton color="#4209B0" text="New Sale" Icon={CirclePlus} />
          </div>
        </div>
      </div>
      
      {/* Form Modal */}
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


/*
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
    
    const newRow = [
      `REF-${10000 + salesData.length}`,
      '$0.00',
      <span 
        key = {`status-${newSaleData.contact}`} 
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
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        {}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Active Sales</h1>
            <p className="text-gray-600">Manage your current sales pipeline</p>
          </div>
          
          <div className="fixed bottom-6 right-6">
            <div onClick={() => setShowForm(true)} className='cursor-pointer'>
              <RoundedButton color="#4209B0" text="New Sale" Icon={CirclePlus} /> {}
            </div>
          </div>
        </div>

        {}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
          <CustomTable headers={salesHeaders} data={salesData} color="#4209B0" /> {}
        </div>
      </div>
      
      {}
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
*/