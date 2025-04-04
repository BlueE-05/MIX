import { BarChart, LineChart, Plus, CirclePlus } from "lucide-react";
import RoundedButton from '@/components/Buttons/RoundedButton';
import KanbanBoard from "@/components/Kanban/KanbanBoard";

export default function KanbanPage() {
  return (
    <div className="flex gap-4 p-8">
      <KanbanBoard />
    </div>
  );
}

{/* 
  import { BarChart, LineChart, Plus, CirclePlus } from "lucide-react";
import RoundedButton from '@/components/Buttons/RoundedButton';
import KanbanBoard from "@/components/Kanban/KanbanBoard";

export default function KanbanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-full mx-auto">
        {/* Header with controls 
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Project Kanban Board</h1>
            <p className="text-gray-600">Drag and drop to manage your tasks</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {/*
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
              <BarChart className="h-4 w-4" />
              <span>Reports</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
              <LineChart className="h-4 w-4" />
              <span>Analytics</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
              <Plus className="h-4 w-4" />
              <span>New Task</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
              <CirclePlus className="h-4 w-4" />
              <span>New Column</span>
            </button>
          </div>
        </div>

        {/* Kanban Board Container 
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
  */}