import React from 'react';
import KanbanBoard from './components/KanbanBoard';
import './components/KanbanBoard.css'; // Importa el archivo CSS

const Page: React.FC = () => {
  return (
    <div className="kanban-board">
      <KanbanBoard />
    </div>
  );
};

export default Page;