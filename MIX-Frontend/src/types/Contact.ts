//src/types/ContactTypes.ts
import { ReactNode } from "react";

export interface ContactAPI {
    ID: number;
    Name: string;
    LastName: string;
    EnterpriseName: string;
    Status: boolean;
    PhoneNumber: string;
    Email: string;
    CreationDate: Date;
}

export interface ContactView {
    Index: number;
    ID: number;
    Name: string;
    LastName: string;
    EnterpriseName: string;
    Status: boolean;
    PhoneNumber: string;
    Email: string;
    CreationDate: Date;
    Actions: ReactNode;
}

export interface ContactUpdate {
    Name: string;
    LastName: string;
    Email: string | '';
    Status: boolean;
    PhoneNumber: string | '';
    EnterpriseName: string;
}

export interface ContactData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  enterprise: string;
}

export interface EnterpriseData {
  name: string;
  description: string;
  industry: string;
  webpageUrl: string;
}