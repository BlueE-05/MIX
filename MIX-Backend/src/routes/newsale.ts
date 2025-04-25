import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';
import NewSaleHTTPHandler from '../handlers/newsale';

const router = Router();

router.get('/ContactsByUser', NewSaleHTTPHandler.getAllContactByUser); //FUNCIONA
router.get('/AllProd', NewSaleHTTPHandler.getAllProd); //FUNCIONA
router.get('/ProdPrice/:idprod', NewSaleHTTPHandler.getPrice);
router.get('/Phases', NewSaleHTTPHandler.getPhases);
router.post('/', NewSaleHTTPHandler.createSaleONE);


export default router;

