import { Router } from 'express';
import SaleHTTPHandler from '../handlers/sale';

const router = Router();

router.get('/AllSales/:id', SaleHTTPHandler.getAllSales);
router.get('/salebyfase/:idfase/:iduser', SaleHTTPHandler.getSaleByFase);
router.get('/salebyent/:ent/:iduser', SaleHTTPHandler.getSaleByEnt);
router.get('/KNnum/:idsale/:iduser', SaleHTTPHandler.getKNnum);
router.get('/KNinfo/:idsale/:iduser', SaleHTTPHandler.getKNinfo);
router.get('/FormInfo/:idsale/:iduser', SaleHTTPHandler.getFormInfo);
router.get('/FormNum/:idsale/:iduser', SaleHTTPHandler.getFormNum);
router.get('/AllEnt', SaleHTTPHandler.getAllEnt);
router.get('/AllProd', SaleHTTPHandler.getAllProd);
router.get('/TopSales/:iduser', SaleHTTPHandler.getTopSales);
//router.delete('/del/:idsale/:iduser', SaleHTTPHandler.deleteSale);




export default router;



