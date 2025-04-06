import express, { Request, Response, NextFunction } from 'express';

import productsRoutes from '@/routes/products';
import contactsRoutes from '@/routes/contacts';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Rutas
app.use('/api/products', productsRoutes);
app.use('/api/contacts', contactsRoutes);

// Middleware de error global (opcional pero recomendado)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal', error: err.message });
});

app.listen(PORT, () => { console.log(`🚀 Servidor corriendo en el puerto ${PORT}`); });