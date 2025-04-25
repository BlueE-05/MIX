'use client';
import { useEffect, useState } from 'react';
import BoxClosed from "@/components/Dashboard/BoxClosed";
import PieChart from "@/components/Dashboard/PieChart";
import BoxComisiones from "@/components/Dashboard/BoxComisiones";
import CustomTable from "@/components/Tables/CustomTable";
import AwardsBox from "@/components/Dashboard/Awards";

interface TopSale {
  SaleID: number;
  ContactName: string;
  Status: string;
  StartDate: string;
  TotalSaleAmount: number;
  TotalProducts: number;
}



interface User {
  team: string;
  position: string;
}

interface TeamJobPos{
  TeamName:string;
  JobPos: string;
}

const DashboardPage = () => {
  const headers = ["REF", "Contact Name", "Status", "Start Day", "Total Sale", "Product Num"];
  const [tableData, setTableData] = useState<React.ReactNode[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchTopSales = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/sale/TopSales`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TopSale[] = await response.json();
        const transformedData = transformData(data);
        setTableData(transformedData);
        setError(null); // Limpiar error si la solicitud es exitosa
      } catch (err) {
        console.error("Error fetching top sales:", err);
        setError("Error loading data...");
        setTableData([]); // Limpiar datos si hay error
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopSales();
  }, []);

  useEffect(() => {
    const fetchTeamPos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/report/TeamPos`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TeamJobPos[] = await response.json();
        setCurrentUser({ team: data[0].TeamName, position: data[0].JobPos});
        setError(null); // Limpiar error si la solicitud es exitosa
      } catch (err) {
        console.error("Error fetching team y pos:", err);
        setError("Error loading data...");
        setTableData([]); // Limpiar datos si hay error
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamPos();
  }, []);

  const transformData = (data: TopSale[]): React.ReactNode[][] => {
    return data.map((sale) => {
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US");
      };

      return [
        `#${sale.SaleID}`,
        sale.ContactName,
        <span 
          key={`status-${sale.SaleID}`} 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            sale.Status === 'Cierre' ? 'bg-green-100 text-green-800' :
            'bg-blue-100 text-blue-800'
          }`}
        >
          {sale.Status}
        </span>,
        formatDate(sale.StartDate),
        `$${sale.TotalSaleAmount.toFixed(2)}`,
        sale.TotalProducts.toString()
      ];
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>
        
        {/* User Info Cards */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Team Card */}
          <div className="bg-white p-4 rounded-lg w-full sm:w-100">
            <label htmlFor="team-display" className="block text-sm font-medium text-green-700 mb-1">
              Team
            </label>
            <input
              type="text"
              id="team-display"
              className="w-full px-3 py-2 rounded-md text-gray-700 cursor-not-allowed focus:outline-none"
              value={currentUser?.team}
              readOnly
            />
          </div>
  
          {/* Position Card */}
          <div className="bg-white p-4 rounded-lg w-full sm:w-65">
            <label htmlFor="position-display" className="block text-sm font-medium text-blue-700 mb-1">
              Position
            </label>
            <input
              type="text"
              id="position-display"
              className="w-full px-3 py-2 rounded-md text-gray-700 cursor-not-allowed focus:outline-none"
              value={currentUser?.position}
              readOnly
            />
          </div>
        </div>
      </div>
  
      {/* Resto del contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Recent sales
            </h2>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading data...</div>
              ) : error ? (
                <div className="text-red-700 px-4 py-3">
                  {error}
                </div>
              ) : (
                <CustomTable 
                  headers={headers} 
                  data={tableData} 
                  includeSearch={false} 
                />
              )}
            </div>
          </div>
        </div>
  
        {/* Right Column*/}
        <div className="h-full flex flex-col gap-4">
          <div>
            <AwardsBox award={"UwU"}/>
          </div>
  
          <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Sales Distribution
            </h2>
            <div className="h-[280px] w-full flex items-center justify-center">
              <PieChart compact={true} />
            </div>
          </div>
          
          {/* Closed Deals y Comisiones - Ambos centrados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center">
              <BoxClosed justify="flex items-center justify-center"/>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center">
              <BoxComisiones />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;