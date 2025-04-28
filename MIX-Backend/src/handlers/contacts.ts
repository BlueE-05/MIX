// src/handlers/contacts.ts
import { Request, Response, NextFunction } from 'express';
import ContactController from '@/controllers/contacts';
import Contact from '@/types/db/ContactDB';
import { AuthRequest } from '@/types/controller/auth0';
import { Auth0Service } from '@/services/auth0.service';

export default class ContactHTTPHandler {
  private contactController: ContactController;
  private auth0Service: Auth0Service;

  constructor() {
    this.contactController = new ContactController();
    this.auth0Service = new Auth0Service();
    this.getContacts = this.getContacts.bind(this);
    this.getContactById = this.getContactById.bind(this);
    this.getContactByName = this.getContactByName.bind(this);
    this.getContactByEnterprise = this.getContactByEnterprise.bind(this);
    this.createContact = this.createContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  public async getContacts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) {
        res.status(400).json({ error: "Token without sub" });
        return;
      }
      const { email } = await this.auth0Service.getUserBySub(sub);

      const contacts = await this.contactController.getAllContacts(email);
      res.json(contacts);
    } catch (error) {
      next(error);
    }
  }

  public async getContactById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) {
        res.status(400).json({ error: "Token without sub" });
        return;
      }
      const { email } = await this.auth0Service.getUserBySub(sub);
      const contactID = Number(req.params.id);
      const contact = await this.contactController.getContactById(email, contactID);
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }

  public async getContactByName(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) {
        res.status(400).json({ error: "Token without sub" });
        return;
      }
      const { email } = await this.auth0Service.getUserBySub(sub);
      const contactName = req.params.name;
      const contact = await this.contactController.getContactByName(email, contactName);
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }

  public async getContactByEnterprise(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) {
        res.status(400).json({ error: "Token without sub" });
        return;
      }
      const { email } = await this.auth0Service.getUserBySub(sub);
      const contactEnterprise = req.params.enterprise;
      const contact = await this.contactController.getContactByEnterprise(email, contactEnterprise);
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }

  public async createContact(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) {
        res.status(400).json({ error: "Token without sub" });
        return;
      }
      const { email } = await this.auth0Service.getUserBySub(sub);
      const contactData: Contact = req.body;
      await this.contactController.createContact(email, contactData);
      res.json({ message: 'Contact created successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async updateContact(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contactID = Number(req.params.id);
      const contactData: Contact = req.body;
      await this.contactController.updateContact(contactID, contactData);
      res.json({ message: 'Contact updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async deleteContact(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contactID = Number(req.params.id);
      await this.contactController.deleteContact(contactID);
      res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}