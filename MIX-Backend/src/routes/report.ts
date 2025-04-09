import { Router } from 'express';
import ReportHTTPHandler from '../handlers/report';

const router = Router();

router.get('/allCierre/:id', ReportHTTPHandler.getAllCierre);
router.get('/allCotizacion/:id', ReportHTTPHandler.getAllCotizacion);
router.get('/allProspecto/:id', ReportHTTPHandler.getAllProspecto);
router.get('/totalComissions/:id', ReportHTTPHandler.getTotalComissions);


export default router;