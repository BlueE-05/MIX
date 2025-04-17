import { poolPromise } from '../database';
import sql from 'mssql';

class SaleService{


  //Desplegar todas las ventas que corresponden a cierto usuario en particular
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
            const result = await request.input('ent', sql.VarChar, ent).input('iduser', sql.Int, iduser).query('SELECT s.ID AS SaleID, (SELECT SUM(p.UnitaryPrice * sa.Quantity) FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum WHERE sa.IDSale = s.ID) AS Total,ph.Name AS Status, c.LastInteraction AS LastContact, s.EndDate AS ClosingDate, s.StartDate AS CreationDate, e.Name AS EnterpriseName FROM Sale s JOIN Phase ph ON s.IDPhase = ph.ID JOIN Contact c ON s.IDContact = c.ID JOIN Enterprise e ON c.IDEnterprise = e.ID WHERE s.IDUser = @iduser AND e.Name = @ent ORDER BY c.LastInteraction');
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

    


    //Cambiar el estado de la fase de acuerdo a la columna en la que se muEva en el kanban
    //Cambiar el estado de la fase cuando se actualiza
      //query para eliminar una sale
    //query para modificar una sale



 

 
}
export default SaleService;



