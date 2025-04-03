//* 3. Controller Conctacts

import ContactService from '@/db/contacts';

export default class ContactController {
    private service = ContactService;

    async getAllContacts() {
        return this.service.getAllContacts();
    }

    async getContactById(id: string) {
        return this.service.getContactById(id);
    }

    async getContactByName(name: string) {
        return this.service.getContactByName(name);
    }

    async getContactByEnterprise(enterprise: string) {
        return this.service.getContactByEnterprise(enterprise);
    }

    async createContact(data: any[]) { //tal vez cambie any, pero creo que lo mas conveniente es que se quede así y los cambios se hagan solamente en db
        //aqui se podria reacomodar la data de ser necesario
        return this.service.createContact(data);
    }

    async updateContact(id: string, data: any[]) {
        //aca se puede reacomodar lo que recibe para que envie correctamente el array de datos al query
        return this.service.updateContact(id, data);
    }

    async deleteContact(id: string) {
        return this.service.deleteContact(id);
    }
}