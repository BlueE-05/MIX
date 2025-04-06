//* 2. Handler Contacts

import { Request, Response, NextFunction } from 'express';
import ContactController from '@/controllers/contacts';

export default class ContactHTTPHandler {
    private contactController: ContactController;

    constructor() {
        this.contactController = new ContactController();
    }

    getContacts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idUser = Number(req.params.idUser);
            const contacts = await this.contactController.getAllContacts(idUser);
            res.json(contacts);
        } catch (error) {
            next(error);
        }
    };

    getContactById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const contact = await this.contactController.getContactById(id);
            res.json(contact);
        } catch (error) {
            next(error);
        }
    };

    getContactByName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idUser = Number(req.params.idUser);
            const contact = await this.contactController.getContactByName(idUser, req.params.name);
            res.json(contact);
        } catch (error) {
            next(error);
        }
    };

    getContactByEnterprise = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idUser = Number(req.params.idUser);
            const contact = await this.contactController.getContactByEnterprise(idUser, req.params.enterprise);
            res.json(contact);
        } catch (error) {
            next(error);
        }
    };

    createContact = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idUser = Number(req.params.idUser);
            await this.contactController.createContact(idUser, req.body);
            res.json({ message: 'Contact created successfully' });
        } catch (error) {
            next(error);
        }
    };

    updateContact = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const updated = await this.contactController.updateContact(id, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    };

    deleteContact = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            await this.contactController.deleteContact(id);
            res.json({ message: 'Contact deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}