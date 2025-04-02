import React from "react";
import PiechartData from "@/mock/PieChartData";

export default function PieChart() {
    return (
        <div className="w-120 h-60 rounded-2xl">
            <div className="p-1">
                <p className="text-lg font-bold">Sales goal of the month</p>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
                 <PiechartData/>
            </div>
        </div>
    
    );
  }