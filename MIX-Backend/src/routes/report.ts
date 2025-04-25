import { Router } from 'express';
import ReportHTTPHandler from '../handlers/report';

const router = Router();

router.get('/allCierre', ReportHTTPHandler.getAllCierre);
router.get('/allActive/:IDUser', ReportHTTPHandler.getAllActive);
router.get('/allCancelled/:id', ReportHTTPHandler.getAllCancelled);
router.get('/totalComissions/:IDUser', ReportHTTPHandler.getTotalComissions);
router.get('/award/:IDEmail', ReportHTTPHandler.getAward);
router.get('/TeamPos', ReportHTTPHandler.getTeamPos);


export default router;