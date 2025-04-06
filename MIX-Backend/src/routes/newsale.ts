import express from 'express';
import { reportHttpHandler } from '../handlers/report';
import newsale from '../controllers/newsale';
import { newsaleHttpHandler } from '@handlers/newsale';

const router = express.Router();

router.get('/contacto/:id', newsaleHttpHandler.getcontactByID);
router.get('/comissions', newsaleHttpHandler.getAllComissions);
router.post('create', newsaleHttpHandler.createNewSale);


export default router;