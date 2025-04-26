import { Router } from 'express';
import ReportHTTPHandler from '../handlers/report';

const router = Router();

router.get('/allCierre', ReportHTTPHandler.getAllCierre);
router.get('/allActive', ReportHTTPHandler.getAllActive);
router.get('/allCancelled', ReportHTTPHandler.getAllCancelled);
router.get('/comisTotal', ReportHTTPHandler.getTotalComissions);
router.get('/Award', ReportHTTPHandler.getAward);
router.get('/TeamPos', ReportHTTPHandler.getTeamPos);
router.get('/DaysMonth', ReportHTTPHandler.getDaysCurrentMonth);
router.get('/ClosedDayUser', ReportHTTPHandler.getEveryDayClosedByUser);
router.get('/ProdInfo/:idprod', ReportHTTPHandler.getProdInfo);
router.get('/SalesTeam', ReportHTTPHandler.getTotalSalesByTeam);
router.get('/ComissionTeam', ReportHTTPHandler.getTotalComissionByTeam);
router.get('/SalesTeamMember', ReportHTTPHandler.getTotalSalesByMember);
router.get('/DaysMonth', ReportHTTPHandler.getDaysCurrentMonth);

export default router;