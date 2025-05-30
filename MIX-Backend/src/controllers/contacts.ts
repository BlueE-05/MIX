//* 3. Controller Conctacts

import ContactService from '@/db/contacts';
import Enterprise from '@/types/controller/Enterprise';
import ContactDB from '@/types/db/ContactDB';
import Contact from '@/types/controller/Contact';
import EnterpriseDB from '@/types/db/EnterpriseDB';

export default class ContactController {
    private service = new ContactService;

    async getAllContacts(userID: string): Promise<ContactDB[]> {
        return this.service.getAllContacts(userID);
    }

    async getContactById(userID: string, contactID: number): Promise<ContactDB[]> {
        return this.service.getContactById(userID, contactID);
    }

    async getContactByName(userID: string, contactName: string): Promise<ContactDB[]> {
        return this.service.getContactByName(userID, contactName);
    }

    async getContactByEnterprise(userID: string, enterprise: string): Promise<ContactDB[]> {
        return this.service.getContactByEnterprise(userID, enterprise);
    }

    async getEnterprise(): Promise<Enterprise[]> {
        return this.service.getEnterprise();
    }

    async createContact(userID: string, data: Contact): Promise<void> {
        return this.service.createContact(userID, data);
    }

    async createEnterprise(enterpriseData: EnterpriseDB): Promise<void> {
        return this.service.createEnterprise(enterpriseData);
    }

    async updateContact(contactID: number, data: Contact): Promise<void> {
        return this.service.updateContact(contactID, data);
    }

    async deleteContact(contactID: number): Promise<void> {
        return this.service.deleteContact(contactID);
    }
}