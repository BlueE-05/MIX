"use client";
//import Pastel from "@/components/Dashboard/Pastel";
import BoxClosed from "@/components/Dashboard/BoxClosed";
//import LinesChart from "@/components/Dashboard/LinesChart";
import PieChart from "@/components/Dashboard/PieChart";
import BoxComisiones from "@/components/Dashboard/BoxComisiones";
import CustomTable from "@/components/Tables/CustomTable";
import React from "react";

const DashboardPage = () => {
  const headers = ["ID", "Tarea", "Estado", "Fecha de Creación"];
  const data = [
    [1, "Tarea 1", "En progreso", "2025-03-13"],
    [2, "Tarea 2", "Completada", "2025-03-12"],
    [3, "Tarea 3", "Pendiente", "2025-03-11"],
    [4, "Tarea 4", "En progreso", "2025-03-10"],
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al panel de control</p>
      </div>

      {/* Main Content */}
      <div className="bg-white grid grid-cols-1 lg:grid-cols-3 gap-6 shadow-md">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* First Row - Table */}
          <div className="bg-white p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Tareas Recientes
            </h2>
            <div className="overflow-x-auto">
              <CustomTable headers={headers} data={data} />
            </div>
          </div>
        </div>

        {/* Right Column - Pie Chart */}
        <div className="h-full flex flex-col gap-4">
          <div className="p-6 bg-white-900 rounded-xl shadow-md h-80">
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
