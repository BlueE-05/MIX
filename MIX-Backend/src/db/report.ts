import { poolPromise } from '../database';
import sql from 'mssql';

class ReportService{


  //Considerar Cierre como ID=5 en Phase en el mes actual
  //LISTO
  async getAllCierre(iduser: string) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('iduser', sql.VarChar, iduser).query(
        `SELECT COUNT(*) AS TotalCierre 
        FROM Sale as s
        WHERE IDUser = @iduser
		    AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
        AND IDPhase = 5`);
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllCierre:', error);
        throw new Error('Error al obtener cierre');
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

  //Considerar cancelled como ID=6 en Phase
  //LISTO
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
  async getTotalComissions(iduser: string) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('iduser', sql.VarChar, iduser).query(
        `SELECT 
        SUM(sa.Quantity * p.Commission * p.UnitaryPrice) AS TotalCommission
        FROM dbo.[User] as u
        JOIN Sale s ON u.IDEmail = s.IDUser
        JOIN SaleArticle sa ON s.ID = sa.IDSale
        JOIN Product p ON sa.IDProduct = p.RefNum
        WHERE u.IDEmail = @iduser
        AND s.IDPhase = 5
		    AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())` );
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en comision:', error);
        throw new Error('Error al obtener comision');
    }
  }

  //Obtener el ultimo premio ganado por un usuario
  //LISTO
  async getLastAward(IDEmail: string){
    const pool = await poolPromise;
    const result = await pool.request()
      .input('IDEmail', sql.VarChar, IDEmail)
      .query(
        `SELECT TOP 1 A.Name
        FROM UserAward UA
        JOIN Award A ON UA.IDAward = A.ID
        WHERE UA.IDUser = @IDEmail
        ORDER BY UA.WinDate DESC;`);
      return result.recordset;
  }

  async getProdInfo(idprod: number){
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idprod', sql.Int, idprod)
      .query(
        `SELECT 
        p.RefNum AS ProductID,
        p.Name AS ProductName,
        p.UnitaryPrice,
        sa.Quantity
        FROM SaleArticle sa
        JOIN Product p ON sa.IDProduct = p.RefNum
        WHERE sa.IDSale = @idprod`);
      return result.recordset;
  }

    async getDaysCurrentMonth() {
      try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.query(`EXEC getDiasDelMesActual`);
        return result.recordset;
      } catch (error) {
        console.error('❌ Error en getDaysCurrentMonth', error);
        throw new Error('Error al obtener dias del mes actual');
      }
    }

    async getEveryDayClosedByUser(IDEmail: string){
      const pool = await poolPromise;
      const result = await pool.request()
        .input('IDEmail', sql.VarChar, IDEmail)
        .query(`EXEC sp_GetDailyClosedSalesByUser @UserEmail = @IDEmail;`);
        return result.recordset;
    }

    //obtener el total de ventas por equipo
    async getTotalSalesByTeam(IDEmail: string){
      const pool = await poolPromise;
      const result = await pool.request()
        .input('IDEmail', sql.VarChar, IDEmail)
        .query(
        `SELECT 
        t.ID AS TeamID,
        t.TeamName,
        COUNT(DISTINCT s.ID) AS TotalCompletedSales
        FROM Sale s
        JOIN SaleArticle sa ON s.ID = sa.IDSale
        JOIN Product p ON sa.IDProduct = p.RefNum
        JOIN [User] u ON s.IDUser = u.IDEmail
        JOIN Team t ON u.TeamID = t.ID
        WHERE s.IDPhase = 5
        AND t.ID = (SELECT TeamID FROM [User] WHERE IDEmail = @IDEmail)
        AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
        GROUP BY t.ID, t.TeamName`);
        return result.recordset;
    }

    async getTotalComissionByTeam(iduser: string){
      const pool = await poolPromise;
      const result = await pool.request()
        .input('iduser', sql.VarChar, iduser)
        .query(
        `SELECT 
        t.ID AS TeamID,
        t.TeamName,
        SUM(sa.Quantity * p.UnitaryPrice * p.Commission) AS ComisionTotal
        FROM Sale s
        JOIN SaleArticle sa ON s.ID = sa.IDSale
        JOIN Product p ON sa.IDProduct = p.RefNum
        JOIN [User] u ON s.IDUser = u.IDEmail
        JOIN Team t ON u.TeamID = t.ID
        WHERE s.IDPhase = 5
        AND t.ID = (SELECT TeamID FROM dbo.[User] WHERE IDEmail = @iduser)
        AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
        GROUP BY t.ID, t.TeamName`);
        return result.recordset;
    }

    async getTotalSalesByMember(IDEmail: string){
      const pool = await poolPromise;
      const result = await pool.request()
        .input('IDEmail', sql.VarChar, IDEmail)
        .query(` EXEC TeamSalesReport @UserEmail = @IDEmail`);
        return result.recordset;
    }

    async getSalesInfoByMember(iduser: string){
      const pool = await poolPromise;
      const result = await pool.request()
        .input('iduser', sql.VarChar, iduser)
        .query(`DECLARE @UserEmail VARCHAR(255) = @iduser


DECLARE @TeamID INT = (SELECT TeamID FROM [User] WHERE IDEmail = @UserEmail);


IF @TeamID IS NULL
BEGIN
    SELECT 'Usuario no encontrado' AS Resultado;
END
ELSE
BEGIN
  
    SELECT 
        u.IDEmail AS UsuarioID,
        u.Name AS NombreCompleto,
        u.PhoneNumber AS Telefono,
        COALESCE(SUM(sa.Quantity * p.UnitaryPrice * p.Commission), 0) AS TotalComisiones,
        COUNT(DISTINCT CASE WHEN s.IDPhase = 5 THEN s.ID END) AS VentasCerradas,
        COUNT(DISTINCT s.ID) AS TotalVentas,
        (SELECT TeamName FROM Team WHERE ID = @TeamID) AS Equipo
    FROM 
        dbo.[User] u
    LEFT JOIN 
        Sale s ON u.IDEmail = s.IDUser
    LEFT JOIN 
        SaleArticle sa ON s.ID = sa.IDSale
    LEFT JOIN 
        Product p ON sa.IDProduct = p.RefNum
    WHERE 
        u.TeamID = @TeamID
    GROUP BY 
        u.IDEmail, u.Name, u.PhoneNumber
    ORDER BY 
        TotalComisiones DESC;
END`);
        return result.recordset;
    }





    async getDailyClosedSalesByTeam(IDEmail: string){
      const pool = await poolPromise;
      const result = await pool.request()
        .input('IDEmail', sql.VarChar, IDEmail)
        .query(`EXEC sp_GetDailyClosedSalesByTeam @UserEmail = @IDEmail`);
        return result.recordset;
    }

 
    //obtener las ventas cerradas por día por miembro del equipo
    async getDailyClosedSalesByMember(IDEmail: string){
      const pool = await poolPromise;
      const result = await pool.request()
        .input('IDEmail', sql.VarChar, IDEmail)
        .query(`EXEC sp_GetDailyClosedSalesByTeamMembers @UserEmail = @IDEmail`);
        return result.recordset;
    }

    
    


}
export default ReportService;

