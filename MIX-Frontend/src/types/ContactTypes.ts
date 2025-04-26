import { ReactNode } from "react";

export interface ContactRecieve {
    id: number;
    name: string;
    lastName: string;
    enterpriseName: string;
    status: boolean;
    phoneNumber: string;
    email: string;
    creationDate: Date;
}

export interface ContactView {
    index: number;
    id: number;
    name: string;
    lastName: string;
    enterpriseName: string;
    status: ReactNode;
    phoneNumber: string;
    email: string;
    creationDate: Date;
    actions: ReactNode;
}

export interface ContactData {
    name: string;
    lastName: string;
    email: string | '';
    phoneNumber: string | '';
    enterpriseName: string;
}