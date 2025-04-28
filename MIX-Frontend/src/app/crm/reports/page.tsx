'use client';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import BoxClosed from '@/components/Dashboard/BoxClosed';
import LinesChart from '@/components/Dashboard/LinesChart';
import PieChart from '@/components/Dashboard/PieChart';
import BoxComisiones from '@/components/Dashboard/BoxComisiones';
import { useFullProfile } from '@/hooks/useFullProfile';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Datos mock para el equipo, admin y usuarios
const teamData = {
  sales: [12000, 19000, 15000, 22000],
  closed: 42,
  comisiones: 1250000,
  distribution: [35, 25, 20, 15, 5]
};

const adminData = {
  id: 'admin',
  name: 'Admin',
  sales: [8000, 9000, 8500, 9500],
  closed: 25,
  comisiones: 7500,
  distribution: [40, 30, 15, 10, 5]
};

const usersData = [
  adminData, // El admin aparece primero
  {
    id: '1',
    name: 'John Doe',
    sales: [4000, 6000, 3000, 8000],
    closed: 15,
    comisiones: 4500,
    distribution: [50, 20, 15, 10, 5]
  },
  {
    id: '2',
    name: 'Jane Smith',
    sales: [5000, 3000, 7000, 6000],
    closed: 18,
    comisiones: 5200,
    distribution: [30, 40, 10, 15, 5]
  }
];

export default function Dashboard() {
  const { profile, loading } = useFullProfile();
  const [isAdmin, setIsAdmin] = useState(false);
  // Para usuarios no-admin, siempre mostrar su reporte individual


  
  useEffect(() => {
    if (!loading && profile) {
      setIsAdmin(profile.isAdmin);
    }
  }, [loading, profile]);


  if (loading || !profile) return <LoadingSpinner />;

  const [reportType, setReportType] = useState<'team' | 'individual'>(isAdmin ? 'team' : 'individual');
  const [selectedUserId, setSelectedUserId] = useState<string>('admin'); // Default admin

  // Obtener datos actuales
  const currentData = !isAdmin 
    ? adminData // Para no-admins, siempre mostrar sus datos
    : reportType === 'team' 
      ? teamData 
      : usersData.find(user => user.id === selectedUserId) || adminData;

  const currentUserName = !isAdmin 
    ? 'My Performance' // Título genérico para no-admins
    : reportType === 'team' 
      ? 'Team' 
      : usersData.find(user => user.id === selectedUserId)?.name || 'Admin';
=======
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
  const [teamMembersData, setTeamMembersData] = useState<{
    UsuarioID: string,
    NombreCompleto: string,
    Telefono: string,
    TotalComisiones: number,
    Activas:number,
    Canceladas: number,
    VentasCerradas: number,
    TotalVentas: number,
    Equipo: string
  }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAdmin = true;

  // Obtener datos del equipo y miembros
  useEffect(() => {
    if (reportType === 'team') {
      setIsLoading(true);
      const fetchTeamData = async () => {
        try {
          // Obtener datos de miembros del equipo desde el nuevo endpoint
          const [salesResponse, comissionsResponse, membersResponse] = await Promise.all([
            fetch(`${HTTPURL}/report/SalesTeam`),
            fetch(`${HTTPURL}/report/ComissionTeam`),
            fetch(`${HTTPURL}/report/SalesInfoMember`)
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
  const selectedUserData = teamMembersData.find(member => member.UsuarioID === selectedUserId);

  // Determinar qué datos mostrar
  const getCurrentData = () => {
    if (isLoading) return null;
    
    if (reportType === 'team') {
      return {
        sales: [], 
        closed: teamSalesData[0]?.TotalCompletedSales,
        comisiones: teamComissionsData[0]?.ComisionTotal,
        distribution: [] 
      };
    }
    
    if (selectedUserId && !selectedUserData) {
      return null; // Usuario no encontrado
    }
    
    if (selectedUserData) {
      return {
        sales: [], // No hay datos de ventas mensuales en el endpoint
        closed: selectedUserData.VentasCerradas,
        comisiones: selectedUserData.TotalComisiones,
        distribution: [] // No hay datos de distribución
      };
    }
    
    return null; // No se ha seleccionado usuario
  };

  const currentData = getCurrentData();
  const currentUserName = reportType === 'individual' && selectedUserId
    ? selectedUserData?.NombreCompleto || 'Usuario no encontrado'
    : 'Equipo';

  // Verificar si se debe mostrar el estado "no seleccionado"
  const showNoSelection = reportType === 'individual' && !selectedUserId && !isLoading;
>>>>>>> origin/pruebanewmerge_sales_report

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
<<<<<<< HEAD
                  if (e.target.value === 'individual') setSelectedUserId('admin');
=======
                  if (e.target.value === 'team') setSelectedUserId('');
>>>>>>> origin/pruebanewmerge_sales_report
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
<<<<<<< HEAD
                >
                  {usersData.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
=======
                  disabled={isLoading}
                >
                  <option value="">Select User</option>
                  {teamMembersData.map((member) => (
                    <option key={member.UsuarioID} value={member.UsuarioID}>
                      {member.NombreCompleto}
>>>>>>> origin/pruebanewmerge_sales_report
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
<<<<<<< HEAD
            {!isAdmin 
              ? 'My Monthly Performance' 
              : reportType === 'team' 
                ? 'Team Monthly Trend' 
                : `${currentUserName}'s Performance`}
          </h2>
          <div className="h-96 md:h-[500px]">
            <LinesChart salesData={currentData.sales} reportType={!isAdmin ? 'individual' : reportType} />
=======
            {reportType === 'team' ? 'Monthly Trend' : 'Monthly Trend'}
          </h2>
          <div className="h-96 md:h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p>Loading chart data...</p>
              </div>
            
              
            ) : isAdmin ? (
              
              <LinesChartReport/>
              ) : (<LinesChart/> )}
>>>>>>> origin/pruebanewmerge_sales_report
          </div>
        </div>

        {/* Right Side - Stacked Content */}
        <div className="lg:col-span-1 h-full flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
<<<<<<< HEAD
              <BoxClosed closedDeals={currentData.closed} numberSize="text-5xl"/>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <BoxComisiones comisiones={currentData.comisiones} numberSize="text-5xl"/>
=======
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
>>>>>>> origin/pruebanewmerge_sales_report
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
<<<<<<< HEAD
              {!isAdmin 
                ? 'My Sales Distribution' 
                : reportType === 'team' 
                  ? 'Team Sales Distribution' 
                  : `${currentUserName}'s Distribution`}
            </h2>
            <PieChart distribution={currentData.distribution} />
=======
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
              <PieChartReport 
                compact={true}
                distribution={
                  selectedUserData 
                    ? [selectedUserData.Canceladas, selectedUserData.Activas, selectedUserData.VentasCerradas]
                    : teamMembersData.length > 0
                      ? [
                          teamMembersData.reduce((sum, member) => sum + member.Canceladas, 0),
                          teamMembersData.reduce((sum, member) => sum + member.Activas, 0),
                          teamMembersData.reduce((sum, member) => sum + member.VentasCerradas, 0)
                        ]
                      : undefined
                }
              />
            ) : (
              <PieChart compact={true}/>
            )}
>>>>>>> origin/pruebanewmerge_sales_report
          </div>
        </div>
      </div>
    </main>
  );
}

