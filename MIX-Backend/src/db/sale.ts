import { poolPromise } from '../database';
import sql from 'mssql';

class SaleService{


  //Considerar Cierre como ID=3 en Phase
  async getAllCierre(id: number) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.Int, id).query('SELECT COUNT(ID) AS Total_Cierre FROM Sale WHERE IDPhase = 3 AND IDUser = @id');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllCierre:', error);
        throw new Error('Error al obtener cierres');
    }
  }

  //Considerar Cotizacion como ID=2 en Phase
  async getAllCotizacion(id: number) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.Int, id).query('SELECT COUNT(ID) AS Total_Cotizacion FROM Sale WHERE IDPhase = 2 AND IDUser = @id');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllCotizacion:', error);
        throw new Error('Error al obtener cotizacion');
    }
  }

  //Considerar Prospecto como ID=1 en Phase
  async getAllProspecto(id: number) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.Int, id).query('SELECT COUNT(ID) AS Total_Prospecto FROM Sale WHERE IDPhase = 1 AND IDUser = @id');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en Prospecto:', error);
        throw new Error('Error al obtener prospecto');
    }
  }

  async getTotalComissions(id: number) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.Int, id).query('SELECT SUM(p.Commission * sa.Quantity) AS TotalCommission FROM Users AS u JOIN Sale AS s ON u.ID = s.IDUser JOIN SaleArticle AS sa ON s.ID = sa.IDSale JOIN Product AS p ON sa.IDProduct = p.RefNum WHERE u.ID = @id GROUP BY u.ID, u.Name');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en Prospecto:', error);
        throw new Error('Error al obtener prospecto');
    }
  }

}
export default SaleService;


/*import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class SaleService {
    private db: Pool;
    constructor(db: Pool) {
      this.db = db;
    }

    //Buscar sale por ID
    async getSaleByID(id: number): Promise<any[]> {
        const result = await this.db.query('SELECT s.ID AS SaleID, (SELECT SUM(p.UnitaryPrice * sa.Quantity) AS Total FROM Sale s JOIN SaleArticle sa ON s.ID = sa.IDSale JOIN Product p ON sa.IDProduct = p.RefNum WHERE s.ID = $1 GROUP BY s.ID) AS Total, p.Name AS Status, c.LastInteraction AS LastContact, s.EndDate AS ClosingDate, s.StartDate AS CreationDate FROM Sale s JOIN Phase p ON s.IDPhase = p.ID JOIN Contact c ON s.IDContact = c.ID WHERE s.ID = $1', [id]);
        return result.rows;
    }

    //Buscar sales por fase
    async getSaleByPhase(idphase: number): Promise<any[]> {
        const result = await this.db.query('SELECT s.ID AS SaleID, (SELECT SUM(p.UnitaryPrice * sa.Quantity) AS Total FROM Sale s JOIN SaleArticle sa ON s.ID = sa.IDSaleJOIN Product p ON sa.IDProduct = p.RefNum WHERE s.IDPhase = $1G ROUP BY s.ID) As Total, p.Name AS Status, c.LastInteraction AS LastContact, s.EndDate AS ClosingDate, s.StartDate AS CreationDate FROM Sale s JOIN Phase p ON s.IDPhase = p.ID JOIN Contact c ON s.IDContact = c.ID WHERE s.IDPhase = $1', [idphase]);
        return result.rows;
    }

}

export default new SaleService(pool);
*/