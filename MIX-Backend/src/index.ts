import express, { Request, Response, NextFunction } from 'express';
const cors = require('cors');

import productsRoutes from '@/routes/products';
import contactsRoutes from '@/routes/contacts';
import enterprisesRoutes from '@/routes/enterprises';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/enterprises', enterprisesRoutes);

// Middleware de error global (opcional pero recomendado)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

app.listen(PORT, () => { console.log(`🚀 Servidor corriendo en el puerto ${PORT}`); });