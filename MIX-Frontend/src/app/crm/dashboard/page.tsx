"use client";
import BoxClosed from "@/components/Dashboard/BoxClosed";
import PieChart from "@/components/Dashboard/PieChart";
import BoxComisiones from "@/components/Dashboard/BoxComisiones";
import CustomTable from "@/components/Tables/CustomTable";
import AwardsBox from "@/components/Dashboard/Awards";

const currentUser = {
  team: "Marketing",
  position: "Especialista de Contenido",
};

const DashboardPage = () => {
  const headers = ["ID", "Tarea", "Estado", "Fecha de Creación"];
  const data = [
    [1, "Tarea 1", "En progreso", "2025-03-13"],
    [2, "Tarea 2", "Completada", "2025-03-12"],
    [3, "Tarea 3", "Pendiente", "2025-03-11"],
    [4, "Tarea 4", "En progreso", "2025-03-10"],
  ];


  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>
        
        {/* User Info Cards */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div>
            <AwardsBox/>
          </div>
          {/* Team Card */}
          <div className="bg-white p-4 rounded-lg w-full sm:w-40">
            <label htmlFor="team-display" className="block text-sm font-medium text-green-700 mb-1">
              Team
            </label>
            <input
              type="text"
              id="team-display"
              className="w-full px-3 py-2 rounded-md text-gray-700 cursor-not-allowed focus:outline-none"
              value={currentUser.team}
              readOnly
            />
          </div>
  
          {/* Position Card */}
          <div className="bg-white p-4 rounded-lg w-full sm:w-64">
            <label htmlFor="position-display" className="block text-sm font-medium text-blue-700 mb-1">
              Position
            </label>
            <input
              type="text"
              id="position-display"
              className="w-full px-3 py-2 rounded-md text-gray-700 cursor-not-allowed focus:outline-none"
              value={currentUser.position}
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
              <CustomTable headers={headers} data={data} includeSearch={false} />
            </div>
          </div>
        </div>
  
        {/* Right Column*/}
        <div className="h-full flex flex-col gap-4">
  
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