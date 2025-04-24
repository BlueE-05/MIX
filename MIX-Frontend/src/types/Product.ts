//src/types/ProductTypes.ts
import { ReactNode } from 'react';

export interface ProductAPI {
    RefNum: string;
    Name: string;
    Description: string;
    UnitaryPrice: number;
    Commission: number;
    ProductSheetURL: string;
    CreationDate: Date;
}

export interface ProductView {
    Index: number;
    RefNum: string;
    Name: string;
    Description: string;
    UnitaryPrice: number;
    Commission: number;
    ProductSheetURL: ReactNode;
    Actions: ReactNode;
}

export interface ProductUpdate {
    Name: string;
    Description: string | '';
    UnitaryPrice: number;
    Commission: number;
    ProductSheetURL: string | '';
}