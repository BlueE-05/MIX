import { Router } from 'express';
import ReportHTTPHandler from '../handlers/report';
import { jwtCheckFromCookie, tryRefreshTokenMiddleware } from '@/middleware/auth0';

const router = Router();
router.use(jwtCheckFromCookie, tryRefreshTokenMiddleware);
const handler = new ReportHTTPHandler();

router.get('/allCierre', handler.getAllCierre);
router.get('/allActive', handler.getAllActive);
router.get('/allCancelled', handler.getAllCancelled);
router.get('/comisTotal', handler.getTotalComissions);
router.get('/Award', handler.getAward);
router.get('/TeamPos', handler.getTeamPos);
router.get('/DaysMonth', handler.getDaysCurrentMonth);
router.get('/ClosedDayUser', handler.getEveryDayClosedByUser);
router.get('/ProdInfo/:idprod', handler.getProdInfo);
router.get('/SalesTeam', handler.getTotalSalesByTeam);
router.get('/ComissionTeam', handler.getTotalComissionByTeam);
router.get('/SalesTeamMember', handler.getTotalSalesByMember);
router.get('/SalesInfoMember', handler.getSalesInfoByMember);
router.get('/DaysMonth', handler.getDaysCurrentMonth);
router.post('/DailyClosedSalesByTeam', handler.getDailyClosedSalesByTeam);
router.post('/DailyClosedSalesByMember', handler.getDailyClosedSalesByMember);
router.post('/SalesInfoMemberByEmail', handler.getSalesInfoMemberByEmail);
router.post('/ClosedDayUserByEmail', handler.getClosedDayUserByEmail);
router.post('/DailyClosedSalesByEmail', handler.getDailyClosedSalesByEmail);
router.get('/SalesInfoTeam', handler.getSalesInfoTeam)


export default router;