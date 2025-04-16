import { Router } from 'express';
import SaleHTTPHandler from '../handlers/sale';

const router = Router();

router.get('/AllContacts/:id', SaleHTTPHandler.getAllSales);
router.get('/salebyfase/:idfase/:iduser', SaleHTTPHandler.getSaleByFase);
router.get('/salebyent/:ent/:iduser', SaleHTTPHandler.getSaleByEnt);
router.get('/KNnum/:idsale/:iduser', SaleHTTPHandler.getKNnumHandler);





export default router;



