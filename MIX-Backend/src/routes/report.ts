
import express from 'express';
import { reportHttpHandler } from '../handlers/report';

const router = express.Router();

router.get('/prospecto', reportHttpHandler.getAllProspecto);
router.get('/cotizacion', reportHttpHandler.getAllCotizacion);
router.get('/cierre', reportHttpHandler.getAllCierre);
router.get('/comisiones', reportHttpHandler.getAllComissions);

export default router;
