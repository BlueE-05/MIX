import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });


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

/* Obtner total de comisiones por usuario
  SELECT SUM(p.Commission * sa.Quantity) AS TotalCommission 
      FROM [User] u 
      JOIN [Sale] s ON u.ID = s.IDUser 
      JOIN [SaleArticle] sa ON s.ID = sa.IDSale 
      JOIN [Product] p ON sa.IDProduct = p.RefNum 
      WHERE u.ID = 1 
      GROUP BY u.ID, u.Name
   */

}

export default new ReportService(pool);

