'use client'
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import { KanbanCard } from "@/types/KanbanTypes";
import { useState } from "react";

export default function KanbanPage() {
  const kanbanData: KanbanCard[] = [
    { id: 1, title: "Contact client", description: "Call client to gather requirements", column: "Prospecting", createdAt: "", updatedAt: "" },
    { id: 2, title: "Send proposal", description: "Email proposal draft", column: "Proposal", createdAt: "", updatedAt: "" },
    { id: 3, title: "Negotiation call", description: "Schedule Zoom call", column: "Negotiation", createdAt: "", updatedAt: "" },
    { id: 4, title: "Follow-up", description: "Check client feedback", column: "Initial Contact", createdAt: "", updatedAt: "" },
    { id: 5, title: "Close deal", description: "Sign agreement", column: "Closing", createdAt: "", updatedAt: "" },
  ];

  const phasesInfo = {
    'Prospecting': 'Initial phase where potential prospects are identified',
    'Initial Contact': 'First contact with the prospect to assess interest',
    'Proposal': 'Formal presentation of a proposal or quote',
    'Negotiation': 'Discussion of the terms and conditions of the agreement',
    'Closing': 'Signing of a contract or closing of the sale',
    'Cancelled': 'Canceled or lost opportunity'
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex gap-4 p-8">
        <KanbanBoard data={kanbanData} />
      </div>

    </main>
  );
}