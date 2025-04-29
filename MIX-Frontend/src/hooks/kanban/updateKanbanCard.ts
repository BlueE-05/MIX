import { KanbanSend } from '@/types/KanbanTypes';
import { url } from '@/utils/constants';

export const updateKanbanCard = async (kanbanData: KanbanSend): Promise<void> => {
    try {
        const response = await fetch(`${url}/api/kanban/${kanbanData.ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(kanbanData.NewPhase),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error updating kanban card: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        console.error("Error updating kanban card:", error);
        throw error;
    }
}