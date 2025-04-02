'use client'
import BoxClosed from "@/components/Dashboard/BoxClosed";
import LinesChart from "@/components/Dashboard/LinesChart";
import PieChart from "@/components/Dashboard/PieChart";
import BoxComisiones from "@/components/Dashboard/BoxComisiones";

export default function Dashboard() {
  return (
      <main className="min-h-screen p-6">
        
        <div className="grid grid-cols-2 gap-3 p-2">
          <div><BoxClosed/></div>
          <div><BoxComisiones/></div>
          <div><PieChart/></div>
          <div><LinesChart/></div>
        </div>

      </main>
  );
}