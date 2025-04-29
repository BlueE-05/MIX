export interface KanbanCard {
    id: number;
    title: string;
    description: string;
    column: string;
    createdAt: string;
    updatedAt: string;
}

export interface KanbanData {
    cards: KanbanCard[];
}