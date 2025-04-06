import sql from 'mssql';
import dotenv from 'dotenv';

// Cargar variables desde el archivo .env
dotenv.config();

// Cargar variables desde el archivo .env.local
dotenv.config({ path: '.env' });

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const database = process.env.DB_DATABASE;

// Verificar si todas las variables de entorno están definidas
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_SERVER:', process.env.DB_SERVER);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

if (!user || !password || !server || !database) {
  throw new Error('Missing required database environment variables.');
}

const config: sql.config = {
  user: user,
  password: password,
  server: server,
  database: database,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

export default config;