//* 3. Controller Conctacts

import ContactService from '@/db/contacts';
import Contact from '@/types/db/ContactDB';

export default class ContactController {
    private service = new ContactService;

    async getAllContacts(userID: string): Promise<Contact[]> {
        return this.service.getAllContacts(userID);
    }

    async getContactById(userID: string, contactID: number): Promise<Contact[]> {
        return this.service.getContactById(userID, contactID);
    }

    async getContactByName(userID: string, contactName: string): Promise<Contact[]> {
        return this.service.getContactByName(userID, contactName);
    }

    async getContactByEnterprise(userID: string, enterprise: string): Promise<Contact[]> {
        return this.service.getContactByEnterprise(userID, enterprise);
    }

    async createContact(userID: string, data: Contact): Promise<void> {
        return this.service.createContact(userID, data);
    }

    async updateContact(contactID: number, data: Contact): Promise<void> {
        return this.service.updateContact(contactID, data);
    }

    async deleteContact(contactID: number): Promise<void> {
        return this.service.deleteContact(contactID);
    }
}