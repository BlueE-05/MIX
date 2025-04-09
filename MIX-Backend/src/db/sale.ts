import { poolPromise } from '../database';
import sql from 'mssql';

class SaleService{


  //Desplegar todas las sales
    //Nota: revisar el orden del orden de los datos que se muestran
    async getAllSales(id: number) {
        try {
           const pool = await poolPromise;
           const request = pool.request();
           const result = await request.input('id', sql.Int, id).query('SELECT s.ID AS SaleID, (SELECT SUM(p.UnitaryPrice * sa.Quantity) FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum WHERE sa.IDSale = s.ID) AS Total, ph.Name AS Status, c.LastInteraction AS LastContact, s.EndDate AS ClosingDate, s.StartDate AS CreationDate, e.Name AS EnterpriseName FROM Sale s JOIN Phase ph ON s.IDPhase = ph.ID JOIN Contact c ON s.IDContact = c.ID JOIN Enterprise e ON c.IDEnterprise = e.ID WHERE s.IDUser = @id ORDER BY c.LastInteraction');
           return result.recordset;
        } catch (error) {
           console.error('❌ Error en getAllCierre:', error);
           throw new Error('Error al obtener cierres');
        }
    }

  
  //Buscar sales por fase
  //Nota: revisar el orden del orden de los datos que se muestran
    async getSaleByFase(idfase: number, iduser: number) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            const result = await request.input('idfase', sql.Int, idfase).input('iduser', sql.Int, iduser).query('SELECT s.ID AS SaleID, (SELECT SUM(p.UnitaryPrice * sa.Quantity) FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum WHERE sa.IDSale = s.ID) AS Total, ph.Name AS Status, c.LastInteraction AS LastContact, s.EndDate AS ClosingDate, s.StartDate AS CreationDate,e.Name AS EnterpriseName FROM Sale s JOIN Phase ph ON s.IDPhase = ph.ID JOIN Contact c ON s.IDContact = c.ID JOIN Enterprise e ON c.IDEnterprise = e.ID WHERE s.IDUser = @iduser  AND s.IDPhase = @idfase ORDER BY c.LastInteraction');
            return result.recordset;
        } catch (error) {
            console.error('❌ Error en getAllCierre:', error);
            throw new Error('Error al obtener cierres');
        }
    }

    //Notas: Agregar el despliegue de un mensaje de "Empresa no encontrada" si no hay ninguna empresa registrada con ese nombre

    async getSaleByEnt(ent: string, iduser: number) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            const result = await request.input('ent', sql.VarChar, ent).input('iduser', sql.Int, iduser).query('SELECT s.ID AS SaleID, (SELECT SUM(p.UnitaryPrice * sa.Quantity) FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum WHERE sa.IDSale = s.ID) AS Total,ph.Name AS Status, c.LastInteraction AS LastContact, s.EndDate AS ClosingDate, s.StartDate AS CreationDate, e.Name AS EnterpriseName FROM Sale s JOIN Phase ph ON s.IDPhase = ph.ID JOIN Contact c ON s.IDContact = c.ID JOIN Enterprise e ON c.IDEnterprise = e.ID WHERE s.IDUser = @iduser AND e.Name = @ent ORDER BY c.LastInteraction');
            return result.recordset;
        } catch (error) {
            console.error('❌ Error en getAllCierre:', error);
            throw new Error('Error al obtener cierres');
        }
    }

    /*
    SELECT 
    s.ID AS SaleID, 
    (SELECT SUM(p.UnitaryPrice * sa.Quantity) 
     FROM SaleArticle sa 
     JOIN Product p ON sa.IDProduct = p.RefNum 
     WHERE sa.IDSale = s.ID) AS Total,
    ph.Name AS Status, 
    c.LastInteraction AS LastContact, 
    s.EndDate AS ClosingDate, 
    s.StartDate AS CreationDate,
    e.Name AS EnterpriseName
FROM 
    Sale s 
JOIN 
    Phase ph ON s.IDPhase = ph.ID 
JOIN 
    Contact c ON s.IDContact = c.ID 
JOIN 
    Enterprise e ON c.IDEnterprise = e.ID
WHERE 
    s.IDUser = 1                  
    AND e.Name = 'Empresa A'       
ORDER BY 
    c.LastInteraction;
    */


 
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