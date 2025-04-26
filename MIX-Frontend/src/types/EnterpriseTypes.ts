export interface EnterpriseSend {
    name: string;
    description?: string | '';
    industry: string;
    website?: string | '';
    address?: string | '';
}

export interface EnterpriseGet {
    ID: number;
    Name: string;
}