'use client'
import Pastel from "@/components/Dashboard/Pastel";
import BoxClosed from "@/components/Dashboard/BoxClosed";
import LinesChart from "@/components/Dashboard/LinesChart";
import PieChart from "@/components/Dashboard/PieChart";
import BoxComisiones from "@/components/Dashboard/BoxComisiones";

export default function Dashboard() {
  return (
      <main className="flex flex-col items-center gap-3 p-2">
        <div>
          <PieChart/>
        </div>
        
        <div>
          <BoxClosed/>
        </div>

        <div>
          <BoxComisiones/>
        </div>

        <div>
          <LinesChart/>
        </div>

      </main>
  );
}