// types.ts
export interface Task {
    id: number,
    ContactName: string,
    Enterprise: string,
    TotalProducts: number,
    TotalSale: number,
    TotalComission: number
  }
  
  export interface ColumnData {
    title: string;
    tasks: Task[];
  }