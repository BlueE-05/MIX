import { poolPromise } from '../database';
import sql from 'mssql';

class SaleService{


  //Desplegar todas las ventas que corresponden a cierto usuario en particular
  // CAMBIO EN LA QUERY: LAST INTERACTION obtener de el ultimo cambio de fase?????
    async getAllSales(id: number) {
        try {
           const pool = await poolPromise;
           const request = pool.request();
           const result = await request.input('id', sql.Int, id).query(
            `SELECT 
            s.ID AS SaleID, 
            e.Name AS EnterpriseName,
            (SELECT SUM(p.UnitaryPrice * sa.Quantity) FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum WHERE sa.IDSale = s.ID) AS Total, 
            ph.Name AS Status, 
            c.LastInteraction AS LastContact, 
            s.EndDate AS ClosingDate, 
            s.StartDate AS CreationDate
            FROM Sale s 
            JOIN Phase ph ON s.IDPhase = ph.ID 
            JOIN Contact c ON s.IDContact = c.ID 
            JOIN Enterprise e ON c.IDEnterprise = e.ID 
            WHERE s.IDUser = @id 
            ORDER BY c.LastInteraction`);
           return result.recordset;
           console.log(result.recordset);
        } catch (error) {
           console.error('❌ Error en getAllCierre:', error);
           throw new Error('Error al obtener cierres');
        }
    }


  
  //Buscar ventas registrads por un usuario por fase
  //Nota: considerar las neuvas fases idk
    async getSaleByFase(idfase: number, iduser: number) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            const result = await request.input('idfase', sql.Int, idfase).input('iduser', sql.Int, iduser).query(
              `SELECT 
              s.ID AS SaleID, 
              e.Name AS EnterpriseName,
              (SELECT SUM(p.UnitaryPrice * sa.Quantity) FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum WHERE sa.IDSale = s.ID) AS Total, 
              ph.Name AS Status, 
              c.LastInteraction AS LastContact, 
              s.EndDate AS ClosingDate, 
              s.StartDate AS CreationDate
              FROM Sale s 
              JOIN Phase ph ON s.IDPhase = ph.ID 
              JOIN Contact c ON s.IDContact = c.ID 
              JOIN Enterprise e ON c.IDEnterprise = e.ID 
              WHERE s.IDUser = @iduser  AND s.IDPhase = @idfase 
              ORDER BY c.LastInteraction`);
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
            const result = await request.input('ent', sql.VarChar, ent).input('iduser', sql.Int, iduser).query('SELECT s.ID AS SaleID, e.Name AS EnterpriseName, (SELECT SUM(p.UnitaryPrice * sa.Quantity) FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum WHERE sa.IDSale = s.ID) AS Total,ph.Name AS Status, c.LastInteraction AS LastContact, s.EndDate AS ClosingDate, s.StartDate AS CreationDate FROM Sale s JOIN Phase ph ON s.IDPhase = ph.ID JOIN Contact c ON s.IDContact = c.ID JOIN Enterprise e ON c.IDEnterprise = e.ID WHERE s.IDUser = @iduser AND e.Name = @ent ORDER BY c.LastInteraction');
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
    async deleteSale(idsale: number, iduser: number): Promise<boolean> {
      const pool = await poolPromise;
      try {
          const result = await pool.request()
              .input('idsale', sql.Int, idsale)
              .input('iduser', sql.Int, iduser)
              .query(`
                  DELETE FROM Sale 
                  OUTPUT DELETED.ID
                  WHERE ID = @idsale AND IDUser = @iduser
              `);
          if (result.recordset.length > 0) {
              return true; 
          }
          return false; 
      } catch (error) {
          console.error('❌ Error en deleteSale:', error);
          return false; 
      }
    }


    async getTopSales(iduser: number) {
      try {
         const pool = await poolPromise;
         const request = pool.request();
         const result = await request.input('iduser', sql.Int, iduser).query(
          `SELECT TOP 5
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
          GROUP BY s.ID, c.Name, c.LastName, ph.Name, s.StartDate
          ORDER BY s.StartDate DESC;`);
         return result.recordset;
         console.log(result.recordset);
      } catch (error) {
         console.error('❌ Error en getTopSales:', error);
         throw new Error('Error al obtener topsales');
      }
  }

    /*Top 5 productos más vendidos por cierto usuario en el mes actual
    SELECT TOP 5
    p.RefNum AS ProductID,
    p.Name AS ProductName,
    SUM(sa.Quantity) AS TotalQuantitySold
FROM 
    Sale s
JOIN 
    SaleArticle sa ON s.ID = sa.IDSale
JOIN 
    Product p ON sa.IDProduct = p.RefNum
WHERE 
    s.IDUser = 1
    AND YEAR(s.StartDate) = YEAR(GETDATE())
    AND MONTH(s.StartDate) = MONTH(GETDATE())
GROUP BY 
    p.RefNum, p.Name
ORDER BY 
    TotalQuantitySold DESC;

    //Versión sin mes actual
    SELECT TOP 5
p.RefNum AS ProductID,
p.Name AS ProductName,
SUM(sa.Quantity) AS TotalQuantitySold
FROM Sale s
JOIN SaleArticle sa ON s.ID = sa.IDSale
JOIN Product p ON sa.IDProduct = p.RefNum
WHERE s.IDUser = 1
GROUP BY p.RefNum, p.Name
ORDER BY TotalQuantitySold DESC;
    */





    //Cambiar el estado de la fase de acuerdo a la columna en la que se muEva en el kanban
    //Cambiar el estado de la fase cuando se actualiza
      //query para eliminar una sale
    //query para modificar una sale



 

 
}
export default SaleService;



