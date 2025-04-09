import { Router } from 'express';
import SaleHTTPHandler from '../handlers/sale';

const router = Router();

router.get('/AllContacts/:id', SaleHTTPHandler.getAllSales);
router.get('/salebyfase/:idfase/:iduser', SaleHTTPHandler.getSaleByFase);
router.get('/salebyent/:ent/:iduser', SaleHTTPHandler.getSaleByEnt);

export default router;



/*import express from 'express';
import { saleHttpHandler } from '../handlers/sale';

const router = express.Router();

router.get('/findid/:id', saleHttpHandler.getSaleByID);
router.get('/findphase/:phase', saleHttpHandler.getSaleByPhase);

export default router;
*/