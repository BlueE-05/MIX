export interface SaleFormData {
  contact: string;
  status: string;
  items: {
    article: string;
    quantity: number;
    price: number;
  }[];
}

export interface Article {
  id: string;
  name: string;
  price: number;
}

export interface SaleItem {
  article: string;
  quantity: number;
  price: number;
}
