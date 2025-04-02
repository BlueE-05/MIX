import express from 'express';
import ContactHTTPHandler from '@/handlers/contacts';

const router = express.Router();
const contactHandler = new ContactHTTPHandler();

router.get('/', contactHandler.getContacts);

/*router.get('/:id', contactHandler.getContactById);

router.delete('/', contactHandler.createContact);

router.put('/:id', contactHandler.updateContact);

router.delete('/:id', contactHandler.deleteContact);

router.get('/', contactHandler.getContactByName);

router.get('/', contactHandler.getContactByEnterptrise);*/

export default router;