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
