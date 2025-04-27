import { poolPromise } from '../database';
import sql from 'mssql';

class SaleService{


  //Desplegar todas las ventas que corresponden a cierto usuario en particular
  // CAMBIO EN LA QUERY: LAST INTERACTION obtener de el ultimo cambio de fase?????
    async getAllSales(id: string) {
        try {
           const pool = await poolPromise;
           const request = pool.request();
           const result = await request.input('id', sql.VarChar, id).query(
            `SELECT 
            s.ID AS SaleID,
            e.Name AS EnterpriseName,
            SUM(sa.Quantity * p.UnitaryPrice) AS Total,
            ph.Name AS Status,
            s.StartDate AS CreationDate
            FROM Sale s
            JOIN Contact c ON s.IDContact = c.ID
            JOIN Enterprise e ON c.IDEnterprise = e.ID
            JOIN Phase ph ON s.IDPhase = ph.ID
            JOIN SaleArticle sa ON s.ID = sa.IDSale
            JOIN Product p ON sa.IDProduct = p.RefNum
            WHERE s.IDUser = @id
            GROUP BY s.ID, e.Name, ph.Name, s.StartDate
            ORDER BY s.StartDate DESC`);
           return result.recordset;
           console.log(result.recordset);
        } catch (error) {
           console.error('Error en getAllCierre:', error);
           throw new Error('Error al obtener cierres');
        }
    }


    //Notas: Agregar el despliegue de un mensaje de "Empresa no encontrada" si no hay ninguna empresa registrada con ese nombre
    async getSaleByEnt(ent: string, iduser: string) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            const result = await request.input('ent', sql.VarChar, ent)
            .input('iduser', sql.VarChar, iduser)
            .query(
              `SELECT 
              s.ID AS SaleID,
              e.Name AS EnterpriseName,
              SUM(sa.Quantity * p.UnitaryPrice) AS Total,
              ph.Name AS Status,
              s.StartDate AS CreationDate
              FROM Sale s
              JOIN Contact c ON s.IDContact = c.ID
              JOIN Enterprise e ON c.IDEnterprise = e.ID
              JOIN Phase ph ON s.IDPhase = ph.ID
              JOIN SaleArticle sa ON s.ID = sa.IDSale
              JOIN Product p ON sa.IDProduct = p.RefNum
              WHERE s.IDUser = @iduser
              AND e.Name = @ent
              GROUP BY s.ID, e.Name, ph.Name, s.StartDate
              ORDER BY s.StartDate DESC`);
            return result.recordset;
        } catch (error) {
            console.error('Error en getAllCierre:', error);
            throw new Error('Error al obtener cierres');
        }
    }

    //Obtener todas las empresas
    async getAllEnt() {
      try {
          const pool = await poolPromise;
          const request = pool.request();
          const result = await request.query('SELECT ID as IDSale, Name as EntName FROM Enterprise');
          return result.recordset;
      } catch (error) {
          console.error('Error en getEnt:', error);
          throw new Error('Error al obtener empresas');
      }
    }

    //Obtener todas los productos
    async getAllProd() {
      try {
          const pool = await poolPromise;
          const request = pool.request();
          const result = await request.query('SELECT RefNum as refnum, Name as NameProd, UnitaryPrice as UnPrice FROM Product');
          return result.recordset;
      } catch (error) {
          console.error('Error en getAllProd:', error);
          throw new Error('Error al obtener productos');
      }
    }


    //Eliminar una sale del sistema
    //LISTO
    async deleteSale(idsale:number) {
      try {
          const pool = await poolPromise;
          const request = pool.request();
          const result = await request.input('idsale', sql.Int, idsale).query(`EXEC sp_DeleteSaleAndRelatedData @SaleID = @idsale;`);
          return result.recordset;
      } catch (error) {
          console.error('Error en DeleteSale:', error);
          throw new Error('Error al eliminar venta');
      }
    }

    

    //Obtener las ultimas 10 ventas registradas en el mes
    //LISTO
    async getTopSales(iduser: string) {
      try {
         const pool = await poolPromise;
         const request = pool.request();
         const result = await request.input('iduser', sql.VarChar, iduser).query(
        `SELECT TOP 10
        s.ID AS SaleID,
        c.Name + ' ' + c.LastName AS ContactName,
        ph.Name AS Status,
        s.StartDate AS StartDate,
        SUM(sa.Quantity * p.UnitaryPrice) AS TotalSaleAmount,
        COUNT(sa.IDProduct) AS TotalProducts
        FROM Sale s
        JOIN Contact c ON s.IDContact = c.ID
        JOIN Phase ph ON s.IDPhase = ph.ID
        JOIN SaleArticle sa ON s.ID = sa.IDSale
        JOIN Product p ON sa.IDProduct = p.RefNum
        WHERE s.IDUser = @iduser
        AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
        GROUP BY s.ID, c.Name, c.LastName, ph.Name, s.StartDate
        ORDER BY s.StartDate DESC`);
         return result.recordset;
         console.log(result.recordset);
      } catch (error) {
         console.error('❌ Error en getTopSales:', error);
         throw new Error('Error al obtener topsales');
      }
  }


  async updatePhaseSale(idsale: number, idphase:number) {
    try {
       const pool = await poolPromise;
       const request = pool.request();
       const result = await request
       .input('idsale', sql.Int, idsale)
       .input('idphase', sql.Int, idphase).query(
      `EXEC sp_UpdateSalePhase @SaleID = @idsale, @NewPhaseID = @idphase`);
       return result.recordset;
       console.log(result.recordset);
    } catch (error) {
       console.error('❌ Error en updatePhaseSale:', error);
       throw new Error('Error al actualizar fase de venta');
    }
}

  
 
}
export default SaleService;



