export interface ContactReceive {
    ID: number;
    Name: string;
    LastName: string;
    EnterpriseName: string;
    Status: boolean;
    PhoneNumber: string;
    Email: string;
    CreationDate: Date;
}

export interface ContactData {
    Name: string;
    LastName: string;
    Email: string | '';
    PhoneNumber: string | '';
    EnterpriseName: string;
}