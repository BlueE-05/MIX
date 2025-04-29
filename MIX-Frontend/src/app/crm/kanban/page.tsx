'use client';

import KanbanBoard from '@/components/Kanban/KanbanBoard';
import { useKanban } from '@/hooks/kanban/useKanban';

export default function KanbanPage() {
  const { tasks, loading } = useKanban();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex gap-4 p-8">
        <KanbanBoard data={tasks} />
      </div>
    </main>
  );
}