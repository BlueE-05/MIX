'use client'
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import { useState } from "react";
import { fetchKanbanData } from "@/hooks/kanban/fetchKanbanData";
import { updateKanbanCard } from "@/hooks/kanban/updateKanbanCard";

export default function KanbanPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { kanbanData, loading, error } = fetchKanbanData();
  const { updateCardColumn } = updateKanbanCard();

  const phasesInfo = {
    'Prospecting': 'Initial phase where potential prospects are identified',
    'Initial Contact': 'First contact with the prospect to assess interest',
    'Proposal': 'Formal presentation of a proposal or quote',
    'Negotiation': 'Discussion of the terms and conditions of the agreement',
    'Closing': 'Signing of a contract or closing of the sale',
    'Cancelled': 'Canceled or lost opportunity'
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex gap-4 p-8">
        <KanbanBoard 
          data={kanbanData} 
          onCardMove={updateCardColumn}
        />
      </div>
      
      <div className="fixed bottom-6 right-6">
        <button 
          className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors text-xl shadow-md"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ?
        </button>
        
        {/* Info Icon */}
        {showTooltip && (
          <div className="absolute bottom-14 right-0 bg-white p-4 rounded-lg shadow-lg w-64 z-10 border border-gray-200">
            <h3 className="font-bold mb-2">Kanban Phases</h3>
            <ul className="space-y-2">
              {Object.entries(phasesInfo).map(([phase, info]) => (
                <li key={phase} className="flex items-start">
                  <span className={`inline-block w-3 h-3 rounded-full mt-1 mr-2 ${
                    phase === 'Prospecting' ? 'bg-sky-300' :
                    phase === 'Initial Contact' ? 'bg-cyan-300' :
                    phase === 'Proposal' ? 'bg-teal-300' :
                    phase === 'Negotiation' ? 'bg-emerald-300' :
                    phase === 'Closing' ? 'bg-lime-300' :
                    'bg-red-300'
                  }`}></span>
                  <div>
                    <span className="font-medium">{phase}:</span> {info}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}