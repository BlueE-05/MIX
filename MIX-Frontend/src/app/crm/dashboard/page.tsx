"use client";
import BoxClosed from "@/components/Dashboard/BoxClosed";
import PieChart from "@/components/Dashboard/PieChart";
import BoxComisiones from "@/components/Dashboard/BoxComisiones";
import CustomTable from "@/components/Tables/CustomTable";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { teams, jobPosition } from "@/constants/formFields";

const DashboardPage = () => {
  const headers = ["ID", "Tarea", "Estado", "Fecha de Creación"];
  const data = [
    [1, "Tarea 1", "En progreso", "2025-03-13"],
    [2, "Tarea 2", "Completada", "2025-03-12"],
    [3, "Tarea 3", "Pendiente", "2025-03-11"],
    [4, "Tarea 4", "En progreso", "2025-03-10"],
  ];

  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [filteredPositions, setFilteredPositions] = useState<typeof jobPosition>([]);

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const teamName = e.target.value;
    setSelectedTeam(teamName);
    setSelectedPosition("");
    
    // Filter positions based on selected team
    const team = teams.find(t => t.name === teamName);
    if (team) {
      const filtered = jobPosition.filter(pos => pos.teamId === team.id);
      setFilteredPositions(filtered);
    } else {
      setFilteredPositions([]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Bienvenido al panel de control</p>
        </div>
        
        {/* Dropdowns Container */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Team Dropdown */}
          <div className="relative w-full sm:w-64">
            <label htmlFor="team-select" className="block text-sm font-medium text-gray-700 mb-1">
              Equipo
            </label>
            <div className="relative">
              <select
                id="team-select"
                value={selectedTeam}
                onChange={handleTeamChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition appearance-none pr-8"
              >
                <option value="">Seleccionar equipo</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Position Dropdown */}
          <div className="relative w-full sm:w-64">
            <label htmlFor="position-select" className="block text-sm font-medium text-gray-700 mb-1">
              Posición
            </label>
            <div className="relative">
              <select
                id="position-select"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                disabled={!selectedTeam}
                className={`w-full px-4 py-2 rounded-lg border ${!selectedTeam ? 'bg-gray-100' : 'bg-white'} border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition appearance-none pr-8`}
              >
                <option value="">{selectedTeam ? "Seleccionar posición" : "Seleccione un equipo primero"}</option>
                {filteredPositions.map((position) => (
                  <option key={position.id} value={position.name}>
                    {position.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Resto del contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Tareas Recientes
            </h2>
            <div className="overflow-x-auto">
              <CustomTable headers={headers} data={data} includeSearch={false} />
            </div>
          </div>
        </div>

        {/* Right Column*/}
        <div className="h-full flex flex-col gap-4">
          <div className="p-6 bg-orange-300 rounded-xl shadow-md h-40 opacity-50">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Awards
            </h2>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md h-80">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Distribución de Ventas
            </h2>
            <div className="">
              <PieChart />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <BoxClosed />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <BoxComisiones />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;