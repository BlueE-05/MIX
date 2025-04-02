import React from "react";
import LinesChartData from "@/mock/LinesChartData";

export default function LinesChart() {
    return (
        <div className="w-120 h-80 rounded-2xl p-2">
            <div className="p-1">
                <p className="text-2xl font-bold">March 2025</p>
                <p className="text-lg font-semibold">Sales Metrics</p>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
                <LinesChartData/>    
            </div>
        </div>
    
    );
  }