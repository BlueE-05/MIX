

//import express from 'express';
const bodyParser = require('body-parser');
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();
import reportRoutes from './src/routes/report';
import newsaleRoutes from './src/routes/newsale';
import saleRoutes from './src/routes/sale';



app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

const PORT = 3002;

app.use('/report', reportRoutes);
app.use('/newsale', newsaleRoutes);
app.use('/sale', saleRoutes);







/*
async function testController() {
  try {
    console.log('=== INICIANDO PRUEBA DIRECTA ===');
    const result = await NewSaleController.createSale(5,5,'2025-10-01','2025-10-04',1);

    console.log('✅ Resultado exitoso:', result);
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error en la prueba:', error.message);
    } else {
      console.error('❌ Error desconocido:', error);
    }
  } finally {
    console.log('=== PRUEBA FINALIZADA ===');
    process.exit();
  }
}

testController();
*/



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