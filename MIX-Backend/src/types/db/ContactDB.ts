export default interface ContactDB {
    id: number | null;
    name: string;
    lastName: string;
    email?: string | null;
    phoneNumber?: string | null;
    enterpriseName: string;
    creationDate?: Date | null;
}