'use client';
import { useState, useEffect } from 'react';
//endpoint
import { HTTPURL } from '@/constants/utils';
import LinesChartReport from '@/components/Dashboard/LinesChartReport';
import LinesChart from '@/components/Dashboard/LinesChart';
import PieChartReport from '@/components/Dashboard/PieChartReport';
import PieChart from '@/components/Dashboard/PieChart';
import BoxComisionesReport from '@/components/Dashboard/BoxComisionesReport';
import BoxClosedReport from '@/components/Dashboard/BoxClosedReport';
import BoxComisiones from '@/components/Dashboard/BoxComisiones';
import BoxClosed from '@/components/Dashboard/BoxClosed';

export default function Dashboard() {
  const [reportType, setReportType] = useState<'team' | 'individual'>('team');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [teamSalesData, setTeamSalesData] = useState<{TeamID: number, TeamName: string, TotalCompletedSales: number}[]>([]);
  const [teamComissionsData, setTeamComissionsData] = useState<{TeamID: number, TeamName: string, ComisionTotal: number}[]>([]);
  const [teamMembersData, setTeamMembersData] = useState<{IDEmail: string, TeamMember: string, TotalSalesCompleted: number, ComisionTotal: number}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAdmin = false;

  // Obtener datos del equipo y miembros
  useEffect(() => {
    if (reportType === 'team') {
      setIsLoading(true);
      const fetchTeamData = async () => {
        try {
          // Fetch team sales data
          const [salesResponse, comissionsResponse, membersResponse] = await Promise.all([
            fetch(`${HTTPURL}/report/SalesTeam`),
            fetch(`${HTTPURL}/report/ComissionTeam`),
            fetch(`${HTTPURL}/report/SalesTeamMember`)
          ]);

          const [salesData, comissionsData, membersData] = await Promise.all([
            salesResponse.json(),
            comissionsResponse.json(),
            membersResponse.json()
          ]);

          setTeamSalesData(salesData);
          setTeamComissionsData(comissionsData);
          setTeamMembersData(membersData);
        } catch (error) {
          console.error('Error fetching team data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTeamData();
    } else {
      setIsLoading(false);
    }
  }, [reportType]);

  // Obtener datos del usuario seleccionado
  const selectedUserData = teamMembersData.find(member => member.IDEmail === selectedUserId);

  // Determinar qué datos mostrar
  const getCurrentData = () => {
    if (isLoading) return null;
    
    if (reportType === 'team') {
      return {
        sales: [], // No hay datos de ventas mensuales en el endpoint
        closed: teamSalesData[0]?.TotalCompletedSales,
        comisiones: teamComissionsData[0]?.ComisionTotal,
        distribution: [] // No hay datos de distribución
      };
    }
    
    if (selectedUserId && !selectedUserData) {
      return null; // Usuario no encontrado
    }
    
    if (selectedUserData) {
      return {
        sales: [], // No hay datos de ventas mensuales en el endpoint
        closed: selectedUserData.TotalSalesCompleted,
        comisiones: selectedUserData.ComisionTotal,
        distribution: [] // No hay datos de distribución
      };
    }
    
    return null; // No se ha seleccionado usuario
  };

  const currentData = getCurrentData();
  const currentUserName = reportType === 'individual' && selectedUserId
    ? selectedUserData?.TeamMember || 'Usuario no encontrado'
    : 'Equipo';

  // Verificar si se debe mostrar el estado "no seleccionado"
  const showNoSelection = reportType === 'individual' && !selectedUserId && !isLoading;

  return (
    <main className="p-6 sm:pt-10">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        
        {isAdmin && (
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <select
                className="bg-white border border-gray-300 rounded-md px-4 py-2"
                value={reportType}
                onChange={(e) => {
                  setReportType(e.target.value as 'team' | 'individual');
                  if (e.target.value === 'team') setSelectedUserId('');
                }}
              >
                <option value="team">Team Report</option>
                <option value="individual">Individual Report</option>
              </select>
            </div>
            
            {reportType === 'individual' && (
              <div>
                <select
                  className="bg-white border border-gray-300 rounded-md px-4 py-2"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">Select User</option>
                  {teamMembersData.map((member) => (
                    <option key={member.IDEmail} value={member.IDEmail}>
                      {member.TeamMember}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side - Expanded Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {reportType === 'team' ? 'Team Monthly Trend' : `${currentUserName}'s Performance`}
          </h2>
          <div className="h-96 md:h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p>Loading chart data...</p>
              </div>
            ) : showNoSelection ? (
              <div className="flex items-center justify-center h-full">
                <p>Please select a user from the dropdown</p>
              </div>
            ) : isAdmin ? (
              
              <LinesChartReport
                salesData={currentData?.sales || []} 
                reportType={reportType} 
                
              />
              ) : (<LinesChart/> )}
          </div>
        </div>

     
        {/* Right Side - Stacked Content */}
        <div className="lg:col-span-1 h-full flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p>Loading...</p>
                </div>
              ) : showNoSelection ? (
                <div className="flex items-center justify-center h-full">
                  <p>Select a user to view data</p>
                </div>
              ) : isAdmin ? (
                <BoxClosedReport closedDeals={currentData?.closed} />
              ) : (
                <BoxClosed closedDeals={currentData?.closed} />
              )}
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p>Loading...</p>
                </div>
              ) : showNoSelection ? (
                <div className="flex items-center justify-center h-full">
                  <p>Select a user to view data</p>
                </div>
              ) : isAdmin ? (
                <BoxComisionesReport comisiones={currentData?.comisiones} />
              ) : (
                <BoxComisiones comisiones={currentData?.comisiones} />
              )}
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {reportType === 'team' ? 'Team Sales Distribution' : 'Individual Distribution'}
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p>Loading chart...</p>
              </div>
            ) : showNoSelection ? (
              <div className="flex items-center justify-center h-full">
                <p>Select a user to view distribution</p>
              </div>
            )  : isAdmin ? (
              <PieChart compact={true}  />
            ) : (
              <PieChart compact={true} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
