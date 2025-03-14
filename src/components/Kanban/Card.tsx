import React from 'react';
import './Card.css'; // Importa el archivo CSS

interface CardProps {
  id: number;
  title: string;
  description?: string;
  onDelete: () => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({ id, title, description, onDelete, onDragStart, onDragEnd }) => {
  return (
    <div
      className="card"
      draggable
      onDragStart={(event) => {
        onDragStart(event);
        event.currentTarget.classList.add('dragging');
      }}
      onDragEnd={(event) => {
        onDragEnd(event);
        event.currentTarget.classList.remove('dragging');
      }}
    >
      <button className="delete-button" onClick={onDelete}>X</button>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Card;
