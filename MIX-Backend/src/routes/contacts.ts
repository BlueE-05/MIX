//* 1. Routes Contacts

import express from 'express';
import ContactHTTPHandler from '@/handlers/contacts';

const router = express.Router();
const contactHandler = new ContactHTTPHandler();

router.get('/:idUser', contactHandler.getContacts);
router.get('/id/:id', contactHandler.getContactById);
router.get('/:idUser/name/:name', contactHandler.getContactByName);
router.get('/:idUser/enterprise/:enterprise', contactHandler.getContactByEnterprise);

router.post('/:idUser', contactHandler.createContact);
router.put('/:id', contactHandler.updateContact);
router.delete('/:id', contactHandler.deleteContact);

export default router;