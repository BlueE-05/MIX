// Capas: db -> controller -> handler -> routes -> Postman

const express = require('express');
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


