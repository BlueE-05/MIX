//* Controller Conctacts

import ContactService from '@/db/contacts';

export default class ContactController {
    private service = ContactService;

    async getAllTweets() {
        return this.service.getAllContacts();
    }
}