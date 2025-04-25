import { Router } from 'express';
import ReportHTTPHandler from '../handlers/report';

const router = Router();

router.get('/allCierre', ReportHTTPHandler.getAllCierre);
router.get('/allActive', ReportHTTPHandler.getAllActive);
router.get('/allCancelled', ReportHTTPHandler.getAllCancelled);
router.get('/totalComissions/:IDUser', ReportHTTPHandler.getTotalComissions);
router.get('/Award', ReportHTTPHandler.getAward);
router.get('/TeamPos', ReportHTTPHandler.getTeamPos);


export default router;