import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_REMOTE_USER || '',
  password: process.env.DB_REMOTE_PASSWORD|| '',
  server: process.env.DB_REMOTE_SERVER || '',
  database: process.env.DB_NAME || '',
  port: Number(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false, // Si usas Azure, ponlo en true
    trustServerCertificate: true,
  }
};

let poolPromise: sql.ConnectionPool;

export async function connectDB() {
  if (!poolPromise) {
    try {
      poolPromise = await new sql.ConnectionPool(config).connect();
      console.log('Conectado a SQL Server con Pool');
    } catch (error) {
      console.error('Error conectando a la BD:', error);
      throw error;
    }
  }
  return poolPromise;
};

export default connectDB;


