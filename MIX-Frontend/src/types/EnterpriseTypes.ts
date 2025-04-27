export interface EnterpriseSend {
    Name: string;
    Description?: string | '';
    Industry: string;
    Website?: string | '';
    Address?: string | '';
}

export interface EnterpriseGet {
    ID: number;
    Name: string;
}