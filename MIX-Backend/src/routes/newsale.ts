import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';
import NewSaleHTTPHandler from '../handlers/newsale';

const router = Router();

router.get('/ContactsByUser/:id', NewSaleHTTPHandler.getAllContactByUser);
router.get('/ContactInfo/:id/:cont', NewSaleHTTPHandler.getInfoContacto);
router.get('/Phases', NewSaleHTTPHandler.getPhases);
//router.post('/', NewSaleHTTPHandler.createSale );


export default router;

