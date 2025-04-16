import express from 'express';
import sql from 'mssql';
const app = express();
import  SaleService  from './src/db/sale';

app.use(express.json());


//Test de funcionamiento de queries
const runTest = async () => {
  const service = new SaleService();
  const result = await service.getKNnum(1, 1); 
  console.log('Resultado final:', result);
};

runTest();


/*
async function main() {
  const saleHandler = SaleHTTPHandler; // Use it as an object if it is not a class

  const idsale = 1; // valores de prueba
  const iduser = 42;

  const response = await saleHandler.getKNnumHandler(idsale, iduser);
  console.log('📦 Resultado desde handler:', response);
}

main();
*/


/*
const runTest = async () => {
  const response = await SaleController.getKNnum(1, 1);
  console.log('Resultado desde el controller:', response);
};

runTest();
*/


/*
const runTest = async () => {
  const service = new SaleService();
  const result = await service.testConnection(1, 1); // Usa los IDs que quieras probar
  console.log('Resultado final:', result);
};
runTest();
*/


/* //COMPROBAR QUE FUNCIONA DESDE INDEX.TS DIRECTAMENTE
const testConnection = async (idsale: number, iduser: number) => {
  const pool = await poolPromise;
  if (!pool) {
    console.log('No se pudo conectar a la base de datos.');
    return;
  }
  try {
    const result = await pool.request()
      .input('idsale', sql.Int, idsale)
      .input('iduser', sql.Int, iduser)
      .query('SELECT SUM(p.Commission * sa.Quantity) AS TotalCommission, SUM(p.UnitaryPrice * sa.Quantity) AS TotalSale FROM Sale s JOIN SaleArticle sa ON s.ID = sa.IDSale JOIN Product p ON sa.IDProduct = p.RefNum WHERE s.ID = @idsale AND s.IDUser = @iduser');
      console.log('✅ Resultado:', result.recordset);
      return result.recordset; 
  } catch (error) {
    console.error('❌ Error en la prueba:');
    throw error; 
  }
};

testConnection(1, 1); // IDs sale=1, user=1
*/