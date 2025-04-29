import { Router } from 'express';
import NewSaleHTTPHandler from '../handlers/newsale';
import { jwtCheckFromCookie, tryRefreshTokenMiddleware } from '@/middleware/auth0';



const router = Router();
router.use(jwtCheckFromCookie, tryRefreshTokenMiddleware);
const handler = new NewSaleHTTPHandler();

router.get('/ContactsByUser', handler.getAllContactByUser); //FUNCIONA
router.get('/AllProd', handler.getAllProd); //FUNCIONA
router.get('/ProdPrice/:idprod', handler.getPrice);
router.get('/Phases', handler.getPhases);
router.post('/', handler.createSaleMULT);


export default router;

