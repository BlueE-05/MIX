import { KanbanCard } from '@/types/KanbanTypes'; 
import { url } from '@/utils/constants';

export const fetchKanbanData = async (): Promise<KanbanCard[]> => {
    try {
        const response = await fetch(`${url}/api/kanban`);
        if (!response.ok) throw new Error("Error fetching all sales for kanban data");

        const kanbanData: KanbanCard[] = await response.json();
        return kanbanData;
    } catch (error) {
        console.error("Error fetching kanban data:", error);
        throw error;
    }
}