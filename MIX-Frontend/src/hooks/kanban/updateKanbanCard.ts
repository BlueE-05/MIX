// updateKanbanCard.ts
import { url } from '@/utils/constants';
import { SaleFromAPI } from './useKanban';

export async function updateKanbanCard(sale: SaleFromAPI, newPhase: number) {
  console.log('updateKanbanCard called with:', { sale, newPhase });

  try {
    const response: Response = await fetch(`${url}/sale/${sale.SaleID}/${newPhase}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating kanban card: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('Failed to update kanban card:', error);
    throw error;
  }
};