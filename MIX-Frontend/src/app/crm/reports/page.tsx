'use client';
import { useState } from 'react';
import BoxClosed from '@/components/Dashboard/BoxClosed';
import LinesChart from '@/components/Dashboard/LinesChart';
import PieChart from '@/components/Dashboard/PieChart';
import BoxComisiones from '@/components/Dashboard/BoxComisiones';

// Datos mock para el equipo y usuarios individuales
const teamData = {
  sales: [12000, 19000, 15000, 22000],
  closed: 42,
  comisiones: 12500,
  distribution: [35, 25, 20, 15, 5]
};

const usersData = [
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
  },
  {
    id: '3',
    name: 'Robert Johnson',
    sales: [3000, 5000, 4000, 3000],
    closed: 9,
    comisiones: 2800,
    distribution: [20, 30, 25, 15, 10]
  }
];

export default function Dashboard() {
  const [reportType, setReportType] = useState<'team' | 'individual'>('team');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const isAdmin = true; // Simulamos que es admin

  // Obtener datos actuales según selección
  const currentData = reportType === 'team' 
    ? teamData 
    : usersData.find(user => user.id === selectedUserId) || teamData;

  const currentUserName = reportType === 'individual' && selectedUserId
    ? usersData.find(user => user.id === selectedUserId)?.name
    : 'Equipo';

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
                  >
                    <option value="">Select User</option>
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
              {reportType === 'team' ? 'Team Monthly Trend' : `${currentUserName}'s Performance`}
            </h2>
            <div className="h-96 md:h-[500px]">
             <LinesChart salesData={currentData.sales} reportType={reportType} />
            </div>
          </div>
  
          {/* Right Side - Stacked Content */}
          <div className="lg:col-span-1 h-full flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <BoxClosed closedDeals={currentData.closed} />
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <BoxComisiones comisiones={currentData.comisiones} />
              </div>
            </div>
  
            <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {reportType === 'team' ? 'Team Sales Distribution' : 'Individual Distribution'}
              </h2>
                <PieChart distribution={currentData.distribution} />
            </div>
          </div>
        </div>
      </main>
    );
  }