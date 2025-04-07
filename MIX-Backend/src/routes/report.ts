import { Router } from 'express';
import ReportHTTPHandler from '../handlers/report';

const router = Router();


router.get('/test', ReportHTTPHandler.getData);

export default router;



/*import express from 'express';
import { reportHttpHandler } from '../handlers/report';

const router = express.Router();

router.get('/data', reportHttpHandler.getData);
/*
router.get('/prospecto', reportHttpHandler.getAllProspecto);
router.get('/cotizacion', reportHttpHandler.getAllCotizacion);
router.get('/cierre', reportHttpHandler.getAllCierre);
router.get('/comisiones', reportHttpHandler.getAllComissions);
*/
/*
export default router; */
