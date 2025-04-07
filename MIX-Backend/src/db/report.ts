import { poolPromise } from '../database';

class ReportService{ //Esto funciona

  async testConnection() {
    const pool = await poolPromise;
    const result = await pool.request().query('select * from User');
    console.log('✅ Conexión exitosa:', result.recordset);
    return result.recordset;
  }
  

}

export default ReportService;

/* //Codigo base que me dio CHATGPT
  async testConnection() {
    const pool = await poolPromise;
    if (!pool) {
      console.log('No se pudo conectar a la base de datos.');
      return;
    }

    try {
      const result = await pool.request().query('SELECT * FROM Users');
      console.log('✅ Conexión exitosa:', result.recordset);
    } catch (error) {
      console.error('Error en la prueba de conexión:', error);
    }
  }
    */


/* //QUERIES
class ReportService {
    private db: Pool;
    constructor(db: Pool) {
      this.db = db;
    }

    //Para grafica de pie
    //Contar cuantas ventas están en estado 3 (Cierre)
    async getAllCierre(): Promise<any[]> {
      const result = await this.db.query('SELECT COUNT(ID) AS Total_Cierre FROM Sale WHERE IDPhase=3');
      return result.rows;
    }

    //Contar cuantas ventas están en estado 2 (Cotizacion)
    async getAllCotizacion(): Promise<any[]> {
      const result = await this.db.query('SELECT COUNT(ID) AS Total_Cierre FROM Sale WHERE IDPhase=2');
      return result.rows;
    }

    //Contar cuantas ventas están en estado 1 (Prospecto)
    async getAllProspecto(): Promise<any[]> {
      const result = await this.db.query('SELECT COUNT(ID) AS Total_Cierre FROM Sale WHERE IDPhase=1');
      return result.rows;
    }

    async getAllComission(): Promise<any[]> {
      const result = await this.db.query('SELECT SUM(p.Commission * sa.Quantity) AS TotalCommissions FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum;');
      return result.rows;
    }

}

export default new ReportService(pool);
*/
