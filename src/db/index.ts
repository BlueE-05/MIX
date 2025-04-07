import * as sql from "mssql";
import { dbConfig } from "../config/db"

const config: sql.config = {
  user: dbConfig.user,
  password: dbConfig.password,
  server: dbConfig.server,
  database: dbConfig.database,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const pool = sql.connect(config);
export { sql };