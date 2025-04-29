import { Router } from 'express';
import SaleHTTPHandler from '../handlers/sale';
import { jwtCheckFromCookie, tryRefreshTokenMiddleware } from '@/middleware/auth0';

const router = Router();
router.use(jwtCheckFromCookie, tryRefreshTokenMiddleware);
const handler = new SaleHTTPHandler();

router.get('/AllSales', handler.getAllSales);
router.get('/salebyent/:ent', handler.getSaleByEnt);
router.get('/AllEnt', handler.getAllEnt);
router.get('/AllProd', handler.getAllProd);
router.get('/TopSales', handler.getTopSales);
router.delete('/:idsale', handler.deleteSale.bind(SaleHTTPHandler));
router.put('/:idsale/:idphase', handler.updatePhaseSale);

export default router;



