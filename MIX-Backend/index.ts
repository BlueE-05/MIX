// Capas: db -> controller -> handler -> routes -> Postman
/*
import express from 'express';
const app = express();
import reportRoutes from './src/routes/report';
import newsaleRoutes from './src/routes/newsale';
import saleRoutes from './src/routes/sale';


app.use(express.json());

app.use('/report', reportRoutes);
app.use('/newsale', newsaleRoutes);
app.use('/sale', saleRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
*/

/*
import express from 'express';
import reportRoutes from './src/routes/report';

const app = express();
app.use(express.json());

app.use('/report', reportRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
*/




//PARA EMERGENCIAS: VERIFICAR LA CONEXION CON LA BASE DE DATOS
/*
import express from 'express';
const app = express();
import { poolPromise } from './src/database';

app.use(express.json());

const testConnection = async () => {
  const pool = await poolPromise;
  if (!pool) {
    console.log('No se pudo conectar a la base de datos.');
    return;
  }

  try {
    // Prueba de conexión con una consulta simple
    const result = await pool.request().query('select * from Phase;');
    console.log('✅ Conexión exitosa:', result.recordset);
  } catch (error) {
    console.error('Error en la prueba de conexión:', error);
  }
};

testConnection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
*/


//import ReportService from './src/db/report';
//import ReportController from './src/controllers/report';

import express from 'express';
import reportRoutes from './src/routes/report';
import newsaleRoutes from './src/routes/newsale';

const app = express();
app.use(express.json());

app.use('/report', reportRoutes);
app.use('/newsale', newsaleRoutes);


/*//Prueba de que funciona db->report
const reportService = new ReportService();
reportService.testConnection(); 
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


