import { ReactNode } from "react";
import { SaleItem } from "./Sales";
import { ProductReceive, ProductUpdate } from "./ProductTypes";
import { ContactData, ContactReceive } from "./ContactTypes";

export interface SaleDetailCardProps {
  sale: {
    id: number;
    refNumber: string;
    enterprise: string;
    amount: string;
    status: ReactNode | string;
    creationDate: string;
    items?: SaleItem[]; // Items es opcional
  };
  onClose: () => void;
  onSave?: (updatedSale: {
    id: number;
    refNumber: string;
    enterprise: string;
    amount: string;
    status: string;
    creationDate: string;
    items?: SaleItem[];
  }) => void;
  onDelete?: (saleId: number) => void
  editButtonText?: string;
  closeButtonText?: string;
  saveButtonText?: string;
  deleteButtonText?: string;
}

export interface ProductDetailCardProps {
    product: ProductReceive
    onClose: () => void
    onSave?: (updatedProduct: ProductUpdate & { refNum: string }) => void
    onDelete?: (productId: number) => void
    editButtonText?: string
    closeButtonText?: string
    saveButtonText?: string
    deleteButtonText?: string
  }


export interface ContactDetailCardProps {
  contact: ContactReceive
  onClose: () => void
  onSave?: (updatedContact: ContactData & { id: number }) => void
  onDelete?: (contactId: number) => void
  editButtonText?: string
  closeButtonText?: string
  saveButtonText?: string
  deleteButtonText?: string
}