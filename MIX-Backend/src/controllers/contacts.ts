//* 3. Controller Conctacts

import ContactService from '@/db/contacts';

export default class ContactController {
    private service = new ContactService;

    async getAllContacts(idUser: number) {
        return this.service.getAllContacts(idUser);
    }

    async getContactById(id: number) {
        return this.service.getContactById(id);
    }

    async getContactByName(idUser: number, name: string) {
        return this.service.getContactByName(idUser, name);
    }

    async getContactByEnterprise(idUser: number, enterprise: string) {
        return this.service.getContactByEnterprise(idUser, enterprise);
    }

    async createContact(idUser: number, data: { name: string; lastName: string; email: string; phoneNumber: number; nameEnterprise: string } ) {
        return this.service.createContact(idUser, data);
    }

    async updateContact(id: number, data: { name: string; lastName: string; email: string; phoneNumber: number }) {
        return this.service.updateContact(id, data);
    }

    async deleteContact(id: number) {
        return this.service.deleteContact(id);
    }
}