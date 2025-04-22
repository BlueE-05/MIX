export default interface Product {
    refNum: string;
    name: string;
    description: string;
    unitaryPrice: number;
    commission: number;
    productSheetURL: string;
    creationDate?: Date | null;
}