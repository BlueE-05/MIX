import { Router } from 'express';
import NewSaleHTTPHandler from '../handlers/newsale';

const router = Router();

router.get('/ContactsByUser/:id', NewSaleHTTPHandler.getAllContactByUser);
router.get('/ContactInfo/:id/:cont', NewSaleHTTPHandler.getInfoContacto);
router.get('/Phases', NewSaleHTTPHandler.getPhases);
router.post('/CreateSale', NewSaleHTTPHandler.createSale);



export default router;


/*import express from 'express';
import { newsaleHttpHandler } from '@handlers/newsale';

const router = express.Router();

router.get('/contacto/:id', newsaleHttpHandler.getcontactByID);
router.get('/comissions', newsaleHttpHandler.getAllComissions);
router.post('create', newsaleHttpHandler.createNewSale);


export default router;
*/