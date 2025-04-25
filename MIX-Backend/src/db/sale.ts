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
            WHERE s.IDUser = 'ana.gomez@empresa.com'
            GROUP BY s.ID, e.Name, ph.Name, s.StartDate
            ORDER BY s.StartDate DESC`);
           return result.recordset;
           console.log(result.recordset);
        } catch (error) {
           console.error('❌ Error en getAllCierre:', error);
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
            console.error('❌ Error en getAllCierre:', error);
            throw new Error('Error al obtener cierres');
        }
    }

    //PARA USAR EN EL KANBAN
    //Mostrar comision total y precio total
    async getKNnum (idsale: number, iduser: number) {
      const pool = await poolPromise;
      try {
        const result = await pool.request().input('idsale', sql.Int, idsale).input('iduser', sql.Int, iduser)
        .query('SELECT SUM(p.Commission * sa.Quantity) AS TotalCommission, SUM(p.UnitaryPrice * sa.Quantity) AS TotalSale FROM Sale s JOIN SaleArticle sa ON s.ID = sa.IDSale JOIN Product p ON sa.IDProduct = p.RefNum WHERE s.ID = @idsale AND s.IDUser = @iduser');
        return result.recordset; 
      } catch (error) {
        console.error('❌ Error en la prueba:');
        throw error; 
      }
    };

    //Mostrar la info de la sale
    async getKNinfo (idsale: number, iduser: number) {
      const pool = await poolPromise;
      try {
        const result = await pool.request().input('idsale', sql.Int, idsale).input('iduser', sql.Int, iduser)
        .query('SELECT e.Name AS EnterpriseName, CONCAT(c.Name , \' \' , c.LastName) AS FullName, SUM(sa.Quantity) AS TotalProducts FROM Sale s JOIN Contact c ON s.IDContact = c.ID JOIN Enterprise e ON c.IDEnterprise = e.ID JOIN SaleArticle sa ON s.ID = sa.IDSale WHERE s.ID = @idsale AND s.IDUser =@iduser GROUP BY c.Name, c.LastName, e.Name');
        return result.recordset; 
      } catch (error) {
        console.error('❌ Error en la prueba:');
        throw error; 
      }
    };

    //REVISION: PLANEAR EL LAST INTERACTION
    async getFormInfo(idsale: number, iduser: number) {
      const pool = await poolPromise;
      try {
        const result = await pool.request().input('idsale', sql.Int, idsale).input('iduser', sql.Int, iduser)
        .query(`SELECT  e.Name AS EntName,
                SUM(p.UnitaryPrice * sa.Quantity) AS TotalSale,
                ph.Name AS SaleStatus,
	              c.LastInteraction as LastInt,
                s.StartDate AS CreationDate
                FROM Sale s
                JOIN Contact as c ON s.IDContact = c.ID
                JOIN Enterprise as e ON c.IDEnterprise = e.ID
                JOIN SaleArticle as sa ON s.ID = sa.IDSale
                JOIN Product as p ON sa.IDProduct = p.RefNum
                JOIN Phase as ph ON s.IDPhase = ph.ID
                JOIN Users as u on u.ID=s.IDUser
                WHERE s.ID = @idsale and u.ID=@iduser
                GROUP BY e.Name, ph.Name, c.LastInteraction, s.StartDate`);
        return result.recordset; 
      } catch (error) {
        console.error('❌ Error en la prueba:');
        throw error; 
      }
    };

    //Obtener de una sale productos, cantidad de productos, y el precio unitario
    async getFormNum(idsale: number, iduser: number) {
      const pool = await poolPromise;
      try {
        const result = await pool.request().input('idsale', sql.Int, idsale).input('iduser', sql.Int, iduser)
        .query(`SELECT 
                p.Name AS ProductName,
                sa.Quantity AS Quantity,
                p.UnitaryPrice AS UnPrice
                FROM Sale s
                JOIN SaleArticle sa ON s.ID = sa.IDSale
                JOIN Product p ON sa.IDProduct = p.RefNum
                WHERE s.ID = @idsale AND s.IDUser =@iduser`);
        return result.recordset; 
      } catch (error) {
        console.error('❌ Error en la prueba:');
        throw error; 
      }
    };

    //Obtener todas las empresas
    async getAllEnt() {
      try {
          const pool = await poolPromise;
          const request = pool.request();
          const result = await request.query('SELECT ID as IDSale, Name as EntName FROM Enterprise');
          return result.recordset;
      } catch (error) {
          console.error('❌ Error en getEnt:', error);
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
          console.error('❌ Error en getAllProd:', error);
          throw new Error('Error al obtener productos');
      }
    }


    //Eliminar una sale del sistema REVISAR
    async deleteSale(idsale:number) {
      try {
          const pool = await poolPromise;
          const request = pool.request();
          const result = await request.input('idsale', sql.Int, idsale).query(`EXEC sp_DeleteSaleAndRelatedData @SaleID = @idsale;`);
          return result.recordset;
      } catch (error) {
          console.error('❌ Error en Prospecto:', error);
          throw new Error('Error al obtener prospecto');
      }
    }

    //Obtener las ultimas 5 ventas registradas en el mes
    //LISTO
    async getTopSales(iduser: string) {
      try {
         const pool = await poolPromise;
         const request = pool.request();
         const result = await request.input('iduser', sql.VarChar, iduser).query(
        `SELECT TOP 15
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

  


      //query para eliminar una sale
    //query para modificar una sale



 

 
}
export default SaleService;



