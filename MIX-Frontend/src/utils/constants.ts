import dotenv from 'dotenv';

// Cargar variables desde el archivo .env
dotenv.config();

// Cargar variables desde el archivo .env.local
dotenv.config({ path: '.env' });

export const url = process.env.NEXT_PUBLIC_API_URL;

console.log("API URL:", url);

if (!url) {
    throw new Error("API URL not defined in environment variables");
}