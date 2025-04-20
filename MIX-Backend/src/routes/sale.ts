import { Router } from 'express';
import SaleHTTPHandler from '../handlers/sale';

const router = Router();

router.get('/AllSales/:id', SaleHTTPHandler.getAllSales);
router.get('/salebyfase/:idfase/:iduser', SaleHTTPHandler.getSaleByFase);
router.get('/salebyent/:ent/:iduser', SaleHTTPHandler.getSaleByEnt);
router.get('/KNnum/:idsale/:iduser', SaleHTTPHandler.getKNnum);
router.get('/KNinfo/:idsale/:iduser', SaleHTTPHandler.getKNinfo);
//router.delete('/del/:idsale/:iduser', SaleHTTPHandler.deleteSale);




export default router;



