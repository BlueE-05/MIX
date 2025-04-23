import { Router } from 'express';
import ReportHTTPHandler from '../handlers/report';

const router = Router();

router.get('/allCierre/:id', ReportHTTPHandler.getAllCierre);
router.get('/allActive/:id', ReportHTTPHandler.getAllActive);
router.get('/allCancelled/:id', ReportHTTPHandler.getAllCancelled);
router.get('/totalComissions/:id', ReportHTTPHandler.getTotalComissions);

router.get('/award', ReportHTTPHandler.getAward);


export default router;