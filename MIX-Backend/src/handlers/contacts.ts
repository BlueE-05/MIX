import { Request, Response, NextFunction } from 'express';
import ContactController from '@/controllers/contacts';

export default class ContactHTTPHandler {
    private contactController = ContactController;

    async getContacts(req: Request, res: Response, next: NextFunction) {
        try {
            const tweets = await this.contactController.getAllContacts();
            res.json(tweets);
        } catch (error) {
            next(error);
        }
    }
}