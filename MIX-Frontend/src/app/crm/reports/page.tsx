'use client';
import { useState } from 'react';
import BoxClosed from '@/components/Dashboard/BoxClosed';
import LinesChart from '@/components/Dashboard/LinesChart';
import PieChart from '@/components/Dashboard/PieChart';
import BoxComisiones from '@/components/Dashboard/BoxComisiones';

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
  const [reportType, setReportType] = useState<'team' | 'individual'>('team');
  const [selectedUserId, setSelectedUserId] = useState<string>('admin'); // Default admin
  const isAdmin = true;

  // Obtener datos actuales según selección
  const currentData = reportType === 'team' 
    ? teamData 
    : usersData.find(user => user.id === selectedUserId) || adminData;

  const currentUserName = reportType === 'team' 
    ? 'Team' 
    : usersData.find(user => user.id === selectedUserId)?.name || 'Admin';

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
                  // Resetear al admin cuando cambia a individual
                  if (e.target.value === 'individual') setSelectedUserId('admin');
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
                >
                  {usersData.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
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
            {reportType === 'team' 
              ? 'Team Monthly Trend' 
              : `${currentUserName}'s Performance`}
          </h2>
          <div className="h-96 md:h-[500px]">
            <LinesChart salesData={currentData.sales} reportType={reportType} />
          </div>
        </div>

        {/* Right Side - Stacked Content */}
        <div className="lg:col-span-1 h-full flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <BoxClosed closedDeals={currentData.closed} numberSize="text-5xl"/>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <BoxComisiones comisiones={currentData.comisiones} numberSize="text-5xl"/>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {reportType === 'team' 
                ? 'Team Sales Distribution' 
                : `${currentUserName}'s Distribution`}
            </h2>
            <PieChart distribution={currentData.distribution} />
          </div>
        </div>
      </div>
    </main>
  );
}