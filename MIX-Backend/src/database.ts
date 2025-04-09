import sql, { ConnectionPool, config } from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig: config = {
<<<<<<< HEAD

=======
 
>>>>>>> 05af417436ebd5b02e28419565df26b4f2fe16b9
  options: {
    encrypt: true,  // Necesario si usas Azure
    trustServerCertificate: true // Si el certificado no es válido
  }
};

// Crear una única conexión global para reutilizar
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log('✅ Conexión a la base de datos establecida.');
    return pool;
  })
  .catch((error) => {
    console.error('❌ Error en la conexión a la base de datos:', error);
    throw error;
  });

export { poolPromise };

