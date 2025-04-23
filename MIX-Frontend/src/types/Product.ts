import { ReactNode } from 'react';

export interface ProductFromAPI {
    refNum: string;
    name: string;
    description: string;
    unitaryPrice: number;
    commission: number;
    productSheetURL: string;
    creationDate?: Date | null;
}

export interface ProductSent {
    refNum: string;
    name: string;
    description: string;
    unitaryPrice: number;
    commission: number;
    productSheetURL: string;
}

export interface ProductView {
    id: number;
    name: string;
    refNum: string;
    description: string;
    unitaryPrice: number;
    commission: number;
    productSheet: ReactNode;
    actions: ReactNode;
}