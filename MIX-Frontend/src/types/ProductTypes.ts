export interface ProductReceive {
    RefNum: string;
    Name: string;
    Description: string;
    UnitaryPrice: number;
    Commission: number;
    ProductSheetURL: string;
    CreationDate: Date;
}

export interface ProductUpdate {
    Name: string;
    Description: string | '';
    UnitaryPrice: number;
    Commission: number;
    ProductSheetURL: string | '';
}

export interface ProductSend {
    RefNum: string;
    Name: string;
    Description: string;
    UnitaryPrice: number;
    Commission: number;
    ProductSheetURL: string;
}