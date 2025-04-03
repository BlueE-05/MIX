//* 1. Routes Contacts

import express from 'express';
import ContactHTTPHandler from '@/handlers/contacts';

const router = express.Router();
const contactHandler = new ContactHTTPHandler();

router.get('/', contactHandler.getContacts);

router.get('/:id', contactHandler.getContactById);

router.post('/', contactHandler.createContact);

router.put('/:id', contactHandler.updateContact);

router.delete('/:id', contactHandler.deleteContact);

router.get('/:name', contactHandler.getContactByName);

router.get('/:enterprise', contactHandler.getContactByEnterptrise);

export default router;