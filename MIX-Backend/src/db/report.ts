import sql from 'mssql';
import config from '@/db/config';

class DbService {
  private pool: sql.ConnectionPool;

  constructor() {
    this.pool = new sql.ConnectionPool(config);
    this.pool.connect().catch(err => console.error('DB connection error:', err));
  }

  async getAllCierre(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      SELECT COUNT(*) AS TotalCierre FROM Sale
      WHERE IDUser = @iduser AND MONTH(StartDate) = MONTH(GETDATE())
      AND YEAR(StartDate) = YEAR(GETDATE()) AND IDPhase = 5`);
    return result.recordset;
  }

  async getAllActive(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      SELECT COUNT(*) AS Active FROM Sale
      WHERE IDUser = @iduser AND MONTH(StartDate) = MONTH(GETDATE())
      AND YEAR(StartDate) = YEAR(GETDATE()) AND IDPhase IN (2,3,4)`);
    return result.recordset;
  }

  async getTemPos(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      SELECT t.TeamName, jp.Name as JobPos 
	FROM [User] u
	INNER JOIN JobPosition as jp ON u.IDJobPosition = jp.ID
	INNER JOIN Team t ON t.ID = jp.IDTeam
	WHERE u.IDEmail = @iduser`);
  	  return result.recordset;
  }

  async getAllCancelled(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      SELECT COUNT(*) AS TotalCancelled FROM Sale
      WHERE IDUser = @iduser AND MONTH(StartDate) = MONTH(GETDATE())
      AND YEAR(StartDate) = YEAR(GETDATE()) AND IDPhase = 6`);
    return result.recordset;
  }

  async getTotalComissions(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      SELECT SUM(sa.Quantity * p.Commission * p.UnitaryPrice) AS TotalCommission
      FROM Sale s
      JOIN SaleArticle sa ON s.ID = sa.IDSale
      JOIN Product p ON sa.IDProduct = p.RefNum
      WHERE s.IDUser = @iduser AND s.IDPhase = 5
      AND MONTH(s.StartDate) = MONTH(GETDATE()) AND YEAR(s.StartDate) = YEAR(GETDATE())`);
    return result.recordset;
  }

  async getLastAward(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      SELECT TOP 1 A.Name FROM UserAward UA
      JOIN Award A ON UA.IDAward = A.ID
      WHERE UA.IDUser = @iduser
      ORDER BY UA.WinDate DESC`);
    return result.recordset;
  }

  async getProdInfo(idsale: number) {
    const request = await this.pool.request();
    const result = await request.input('idsale', sql.Int, idsale).query(`
      SELECT p.RefNum AS ProductID, p.Name AS ProductName, p.UnitaryPrice, sa.Quantity
      FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum
      WHERE sa.IDSale = @idsale`);
    return result.recordset;
  }

  async getDaysCurrentMonth() {
    const request = await this.pool.request();
    const result = await request.query(`EXEC getDiasDelMesActual`);
    return result.recordset;
  }

  async getEveryDayClosedByUser(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      EXEC sp_GetDailyClosedSalesByUser @UserEmail = @iduser`);
    return result.recordset;
  }

  async getTotalSalesByTeam(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      SELECT t.ID AS TeamID, t.TeamName, COUNT(DISTINCT s.ID) AS TotalCompletedSales
      FROM Sale s
      JOIN [User] u ON s.IDUser = u.IDEmail
      JOIN Team t ON u.IDJobPosition = t.ID
      WHERE s.IDPhase = 5 AND MONTH(s.StartDate) = MONTH(GETDATE())
      AND YEAR(s.StartDate) = YEAR(GETDATE())
      AND t.ID = (SELECT IDJobPosition FROM [User] WHERE IDEmail = @iduser)
      GROUP BY t.ID, t.TeamName`);
    return result.recordset;
  }

  async getTotalComissionByTeam(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      SELECT t.ID AS TeamID, t.TeamName, SUM(sa.Quantity * p.UnitaryPrice * p.Commission) AS ComisionTotal
      FROM Sale s
      JOIN SaleArticle sa ON s.ID = sa.IDSale
      JOIN Product p ON sa.IDProduct = p.RefNum
      JOIN [User] u ON s.IDUser = u.IDEmail
      JOIN Team t ON u.IDJobPosition = t.ID
      WHERE s.IDPhase = 5 AND MONTH(s.StartDate) = MONTH(GETDATE())
      AND YEAR(s.StartDate) = YEAR(GETDATE())
      AND t.ID = (SELECT IDJobPosition FROM [User] WHERE IDEmail = @iduser)
      GROUP BY t.ID, t.TeamName`);
    return result.recordset;
  }

  async getTotalSalesByMember(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      EXEC TeamSalesReport @UserEmail = @iduser`);
    return result.recordset;
  }

  async getSalesInfoByMember(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      DECLARE @UserEmail VARCHAR(255) = @iduser
DECLARE @TeamID INT = (SELECT jp.IDTeam 
                       FROM [User] u
                       JOIN JobPosition jp ON u.IDJobPosition = jp.ID
                       WHERE u.IDEmail = @UserEmail);

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
        COUNT(DISTINCT CASE WHEN s.IDPhase IN (2, 3, 4) THEN s.ID END) AS Activas,
        COUNT(DISTINCT CASE WHEN s.IDPhase = 6 THEN s.ID END) AS Canceladas,
        COUNT(DISTINCT s.ID) AS TotalVentas,
        (SELECT TeamName FROM Team WHERE ID = @TeamID) AS Equipo
    FROM 
        dbo.[User] u
    JOIN JobPosition jp ON u.IDJobPosition = jp.ID
    LEFT JOIN Sale s ON u.IDEmail = s.IDUser
    LEFT JOIN SaleArticle sa ON s.ID = sa.IDSale
    LEFT JOIN Product p ON sa.IDProduct = p.RefNum
    WHERE 
        jp.IDTeam = @TeamID
    GROUP BY 
        u.IDEmail, u.Name, u.PhoneNumber
    ORDER BY 
        TotalComisiones DESC;
END;`);
    return result.recordset;
  }

 

  async getDailyClosedSalesByTeam(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      EXEC sp_GetDailyClosedSalesByTeam @UserEmail = @iduser`);
    return result.recordset;
  }

  async getDailyClosedSalesByMember(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      EXEC sp_GetDailyClosedSalesByTeamMembers @UserEmail = @iduser`);
    return result.recordset;
  }
}

export default DbService;