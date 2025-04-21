'use client';
import BoxClosed from '@/components/Dashboard/BoxClosed';
import LinesChart from '@/components/Dashboard/LinesChart';
import PieChart from '@/components/Dashboard/PieChart';
import BoxComisiones from '@/components/Dashboard/BoxComisiones';

export default function Dashboard() {
  return (
    <main className="p-6 sm:pt-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Side - Expanded Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Trend</h2>
          <div className="h-96 md:h-[500px]"> {/* Further increased height */}
            <LinesChart />
          </div>
        </div>

        {/* Right Side - Stacked Content */}
        <div className="lg:col-span-1 h-full flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4"> {/* Single column grid for the boxes */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <BoxClosed />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <BoxComisiones />
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md h-80 flex-grow"> {/* PieChart takes remaining space */}
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Sales Distribution
            </h2>
            <div className="h-full">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}