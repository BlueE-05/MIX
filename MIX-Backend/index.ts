

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

const PORT = 3003;

app.use('/report', reportRoutes);
app.use('/newsale', newsaleRoutes);
app.use('/sale', saleRoutes);





app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


