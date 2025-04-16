
//PARA EMERGENCIAS: VERIFICAR LA CONEXION CON LA BASE DE DATOS

import express from 'express';
import SaleHTTPHandler from './src/handlers/sale';
import sql from 'mssql';
const app = express();
import reportRoutes from './src/routes/report';
import newsaleRoutes from './src/routes/newsale';
import saleRoutes from './src/routes/sale';
//import { poolPromise } from './src/database';
//import  SaleService  from './src/db/sale';
//import SaleController from './src/controllers/sale';

app.use(express.json());

const PORT = 3001;

app.use('/report', reportRoutes);
app.use('/newsale', newsaleRoutes);
app.use('/sale', saleRoutes);



app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});







/*
import express from 'express';
import reportRoutes from './src/routes/report';
import newsaleRoutes from './src/routes/newsale';
import saleRoutes from './src/routes/sale';



const app = express();
app.use(express.json());

app.use('/report', reportRoutes);
app.use('/newsale', newsaleRoutes);
app.use('/sale', saleRoutes);




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
*/

/*//Prueba de que funciona db->report
const reportService = new ReportService();
reportService.testConnection(); 
*/