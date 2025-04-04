// Capas: db -> controller -> handler -> routes -> Postman
const express = require('express');
const app = express();

import contactsRoutes from "@/routes/contacts";
import productsRoutes from '@/routes/products';

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('api/contacts', contactsRoutes);
app.use('api/products', productsRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

/*
por que se usa controller mas alla de las pruebas unitarias
en el frontend vamos a hacer rputer.post, .get, etc?
*/