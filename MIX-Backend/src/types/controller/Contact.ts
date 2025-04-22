export default interface Contact {
    id: number;
    name: string;
    lastName: string;
    enterpriseName: string;
    status: boolean;
    phoneNumber?: string | '';
    email?: string | '';
    creationDate: Date;
}