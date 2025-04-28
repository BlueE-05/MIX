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

/*//probar funcion createSale desde el index
async function testNewSaleService() {
  const newsaleService = new NewSaleService;
  try {
    console.log('=== INICIANDO PRUEBA DE NewSaleService ===');
    
    // 1. Preparar datos de prueba
    const testSaleData = {
      iduser: 3,          // ID de usuario válido
      idcont: 3,          // ID de contacto válido
      startdate: '2025-06-01', // Fecha actual (YYYY-MM-DD)
      enddate: '2023-06-10', // +7 días
      idphase: 1          // ID de fase válido
    };

    console.log('📋 Datos de prueba:', testSaleData);

    // 2. Llamar al método createSale de la clase
    console.log('⌛ Ejecutando NewSaleService.createSale...');
    const result = await newsaleService.createSale(
      testSaleData.iduser,
      testSaleData.idcont,
      testSaleData.startdate,
      testSaleData.enddate,
      testSaleData.idphase
    );

    // 3. Verificar resultados
    if (result.success) {
      console.log('✅ Prueba exitosa!');
      console.log('📊 Resultado:', result.data);
      
      // Verificación adicional (opcional)
      if (result.data && result.data.rowsAffected && result.data.rowsAffected[0] === 1) {
        console.log('✔️ Se afectó exactamente 1 registro');
      } else {
        console.warn('⚠️ La operación fue exitosa pero no se afectaron registros');
      }
    } else {
      console.error('❌ La operación falló:', result.error);
    }

    return result;
  } catch (error) {
    console.error('🔴 Error inesperado en la prueba:', error);
    
    // Manejo detallado de errores de SQL
    if (error instanceof sql.RequestError) {
      console.error('📌 Detalles del error SQL:', {
        code: error.code,
        number: error.number,
        message: error.message
      });
    }
    
    throw error;
  } finally {
    console.log('=== PRUEBA FINALIZADA ===');
    // Cerrar conexión si es necesario
    
  }
}

// Ejecutar la prueba
testNewSaleService()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
*/


/* no es ninguna prueba xd
async function testSaleInsert() {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('iduser', sql.Int, 1)    // Valores de prueba
      .input('idcont', sql.Int, 1)
      .input('startdate', sql.DateTime, new Date())
      .input('enddate', sql.DateTime, new Date(Date.now() + 7*24*60*60*1000)) // +7 días
      .input('idphase', sql.Int, 1)
      .query(`
        INSERT INTO Sale (IDUser, IDContact, StartDate, EndDate, IDPhase) 
        VALUES (@iduser, @idcont, @startdate, @enddate, @idphase)
      `);

    console.log('✅ Inserción exitosa:', result);
    return result;
  } catch (error) {
    console.error('❌ Error en la inserción:', error);
    throw error;
  }
}

testSaleInsert();
*/