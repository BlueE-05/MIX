'use client'
import BoxClosed from "@/components/Dashboard/BoxClosed";
import LinesChart from "@/components/Dashboard/LinesChart";
import PieChart from "@/components/Dashboard/PieChart";
import BoxComisiones from "@/components/Dashboard/BoxComisiones";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Resumen de métricas clave</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Row - Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Cierres</h2>
          <BoxClosed />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Comisiones</h2>
          <BoxComisiones />
        </div>

        {/* Second Row - Charts */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Distribución de Ventas</h2>
          <div className="h-64">
            <PieChart />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tendencia Mensual</h2>
          <div className="h-64">
            <LinesChart />
          </div>
        </div>
      </div>
    </main>
  );
}