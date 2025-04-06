// Capas: db -> controller -> handler -> routes -> Postman

const express = require('express');
const app = express();
import  reportRoutes  from './src/routes/report';
import pruebaRoutes from './src/routes/prueba';


app.use(express.json());

app.use('/prueba', reportRoutes);
app.use('/report', pruebaRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


