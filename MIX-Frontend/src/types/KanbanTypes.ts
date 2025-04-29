export interface Task {
    id: number;
    title: string;
    column: string;
    createdAt: string;
  
    Enterprise?: string;
    TotalSale?: number;
    TotalComission?: number;
  }
  
  export interface KanbanCard {
    id: number;
    title: string;
    description: string;
    column: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface KanbanSend {
    ID: number;
    NewPhase: {
      column: string;
    };
  }
  