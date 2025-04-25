import { poolPromise } from '../database';
import sql from 'mssql';

class ReportService{


  //Considerar Cierre como ID=5 en Phase en el mes actual
  //LISTO
  async getAllCierre(id: string) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.VarChar, id).query(
        `SELECT COUNT(*) AS TotalCierre 
        FROM Sale as s
        WHERE IDUser = @id
		    AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
        AND IDPhase = 5`);
        return result.recordset.length > 0 ? result.recordset[0].Name : null;
    } catch (error) {
        console.error('❌ Error en getAllCierre:', error);
        throw new Error('Error al obtener cierres');
    }
  }

  //Considerar Actives como ID=2,3,4 en Phase
  //LISTO
  async getAllActive(id: string) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.VarChar, id).query(
        `SELECT COUNT(*) AS Active
        FROM Sale as s
        WHERE s.IDUser = @id
        AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
        AND s.IDPhase IN (2, 3, 4)`);
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllCotizacion:', error);
        throw new Error('Error al obtener cotizacion');
    }
  }

  //Obtener el team y position
  //LISTO
  async getTemPos(iduser: string) {
        try {
           const pool = await poolPromise;
           const request = pool.request();
           const result = await request.input('iduser', sql.VarChar, iduser).query(
          `select  
          t.TeamName as TeamName,
          jp.Name as JobPos 
          FROM dbo.[User] AS u 
          INNER JOIN Team AS t on u.TeamID = t.ID 
          INNER JOIN JobPosition as jp ON jp.ID=u.IDJobPos 
          Where IDEmail=@iduser`);
           return result.recordset;
           console.log(result.recordset);
        } catch (error) {
           console.error('❌ Error en getTeamPos:', error);
           throw new Error('Error al obtener team y position');
        }
    }

  //Considerar Prospecto como ID=1 en Phase
  //MODIFICAR: Mes actual
  async getAllCancelled(id: string) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.VarChar, id).query(`SELECT COUNT(*) AS TotalCancelled
        FROM Sale as s
        WHERE IDUser = @id
		    AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
        AND IDPhase = 6`);
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en Prospecto:', error);
        throw new Error('Error al obtener prospecto');
    }
  }

  
  //Calcular comisiones de un solo usuario en el mes actual
  //LISTO
  async getTotalComissions(IDUser: string) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('IDUser', sql.VarChar, IDUser).query(
        `SELECT 
        SUM(sa.Quantity * p.Commission) AS TotalCommission
        FROM Users u
        JOIN Sale s ON u.IDEmail = s.IDUser
        JOIN SaleArticle sa ON s.ID = sa.IDSale
        JOIN Product p ON sa.IDProduct = p.RefNum
        WHERE u.IDEmail = @id
		    AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())` );
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en comision:', error);
        throw new Error('Error al obtener comision');
    }
  }

  async getLastAward(IDEmail: string){
    const pool = await poolPromise;
    const result = await pool.request()
      .input('IDEmail', sql.VarChar, IDEmail)
      .query(
        `SELECT TOP 1 A.Name
        FROM UserAward UA
        JOIN Award A ON UA.IDAward = A.ID
        WHERE UA.IDUser = @IDEmail
        ORDER BY UA.WinDate DESC;`
        
      );
      return result.recordset;
    
  }

  //Lo que falta
  //Trigger para que se actualice las tablas y graficas cada cambio de mes**

}
export default ReportService;

