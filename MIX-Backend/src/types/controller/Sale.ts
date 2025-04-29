export interface Sale {
    SaleID: number;
    EnterpriseName: string;
    Total: number;
    Status: string;
    CreationDate: Date;
}

export interface SaleArticle {
    IDSale: number;
    IDProduct: string;
    Quantity: number;
}

export interface Product {
    RefNum: string;
    NameProd: string;
    UnPrice: number;
}