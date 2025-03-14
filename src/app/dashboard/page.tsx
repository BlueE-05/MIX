'use client'
import Pastel from "@/components/Dashboard/Pastel";
import BoxClosed from "@/components/Dashboard/BoxClosed";
import LinesChart from "@/components/Dashboard/LinesChart";
import PieChart from "@/components/Dashboard/PieChart";
import BoxComisiones from "@/components/Dashboard/BoxComisiones";
import CustomTable from "@/components/Tables/CustomTable";

export default function Dashboard() {
  const headers = ['ID', 'Tarea', 'Estado', 'Fecha de Creación'];
  const data = [
    [1, 'Tarea 1', 'En progreso', '2025-03-13'],
    [2, 'Tarea 2', 'Completada', '2025-03-12'],
    [3, 'Tarea 3', 'Pendiente', '2025-03-11'],
    [4, 'Tarea 4', 'En progreso', '2025-03-10'],
  ];

  return (
    <main className="flex flex-col gap-3 p-2">
      <div className="grid grid-cols-2 gap-4">
        {/* Lado izquierdo */}
        <div className="flex flex-col gap-3">
          <PieChart />
          
          {/* Grid para BoxClosed y BoxComisiones en la misma fila */}
          <div className="grid grid-cols-2 gap-4 flex items-center">
            <BoxClosed />
            <BoxComisiones />
          </div>

          <LinesChart />
        </div>

        {/* Lado derecho */}
        <div>
          <CustomTable headers={headers} data={data} />
        </div>
      </div>
    </main>
  );
}