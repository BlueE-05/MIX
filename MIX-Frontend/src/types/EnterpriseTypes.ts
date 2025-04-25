export interface EnterpriseSend {
    Name: string;
    Description?: string | '';
    Industry: string;
    WebPage?: string | '';
    Location?: string | '';
}

export interface EnterpriseGet {
    ID: number;
    Name: string;
}