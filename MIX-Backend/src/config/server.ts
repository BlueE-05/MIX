import dotenv from "dotenv";
dotenv.config();

export const serverConfig = {
    port: process.env.PORT!,
    urlFront: process.env.URL_FRONT!,
};