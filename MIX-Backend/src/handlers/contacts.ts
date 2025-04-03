//* 2. Handler Contacts

import { Request, Response, NextFunction } from 'express';
import ContactController from '@/controllers/contacts';

export default class ContactHTTPHandler {
    private contactController: ContactController;

    constructor() {
        this.contactController = new ContactController();
    }

    async getContacts(req: Request, res: Response, next: NextFunction) {
        try {
            const contacts = await this.contactController.getAllContacts();
            res.json(contacts);
        } catch (error) {
            next(error);
        }
    }

    async getContactById(req: Request, res: Response, next: NextFunction) {
        try {
            const contact = await this.contactController.getContactById(req.params.id);
            res.json(contact);
        } catch (error) {
            next(error);
        }
    }

    async createContact(req: Request, res: Response, next: NextFunction) {
        try {
            const newContact = await this.contactController.createContact(req.body);
            res.json(newContact);
        } catch (error) {
            next(error);
        }
    }

    async updateContact(req: Request, res: Response, next: NextFunction) {
        try {
            const contact = await this.contactController.updateContact(req.params.id, req.body);
            res.json(contact);
        } catch (error) {
            next(error);
        }
    }

    async deleteContact(req: Request, res: Response, next: NextFunction) {
        try {
            await this.contactController.deleteContact(req.params.id);
            res.json({ message: 'Contact deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getContactByName(req: Request, res: Response, next: NextFunction) {
        try {
            const contact = this.contactController.getContactByName(req.params.name);
            res.json(contact);
        } catch (error) {
            next(error);
        }
    }

    async getContactByEnterprise(req: Request, res: Response, next: NextFunction) {
        try {
            const contact = this.contactController.getContactByEnterprise(req.params.enterprise);
            res.json(contact);
        } catch (error) {
            next(error);
        }
    }   
}