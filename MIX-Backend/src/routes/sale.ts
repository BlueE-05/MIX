import { Router } from 'express';
import SaleHTTPHandler from '../handlers/sale';

const router = Router();

router.get('/AllSales', SaleHTTPHandler.getAllSales);
router.get('/salebyent/:ent/:iduser', SaleHTTPHandler.getSaleByEnt);
router.get('/AllEnt', SaleHTTPHandler.getAllEnt);
router.get('/AllProd', SaleHTTPHandler.getAllProd);
router.get('/TopSales', SaleHTTPHandler.getTopSales);
router.delete('/:idsale', SaleHTTPHandler.deleteSale.bind(SaleHTTPHandler));
router.put('/:idsale/:idphase', SaleHTTPHandler.updatePhaseSale);





export default router;



