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

  async getTotalSalesByTeam(adminEmail: string) {
    const request = await this.pool.request();
    const result = await request.input('adminEmail', sql.VarChar, adminEmail).query(`
      SELECT
        COUNT(CASE WHEN ph.Name = 'Cancelled' THEN 1 END) AS Canceladas,
        COUNT(CASE WHEN ph.Name IN ('Prospecting', 'Initial Contact', 'Proposal', 'Negotiation') THEN 1 END) AS Activas,
        COUNT(CASE WHEN ph.Name = 'Closing' THEN 1 END) AS VentasCerradas,
        ISNULL(SUM(CASE WHEN ph.Name = 'Closing' THEN sa.Quantity * p.Commission END), 0) AS TotalComisiones
      FROM Admin a
      JOIN Team t ON a.IDTeam = t.ID
      JOIN JobPosition jp ON jp.IDTeam = t.ID
      JOIN [User] u ON u.IDJobPosition = jp.ID
      LEFT JOIN Sale s ON s.IDUser = u.IDEmail
      LEFT JOIN Phase ph ON s.IDPhase = ph.ID
      LEFT JOIN SaleArticle sa ON sa.IDSale = s.ID
      LEFT JOIN Product p ON p.RefNum = sa.IDProduct
      WHERE a.IDUser = @adminEmail;
    `);
    return result.recordset;
  }

  async getTotalComissionByTeam(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      SELECT 
        t.ID AS TeamID, 
        t.TeamName, 
        SUM(sa.Quantity * p.UnitaryPrice * p.Commission) AS ComisionTotal
      FROM Sale s
      JOIN SaleArticle sa ON s.ID = sa.IDSale
      JOIN Product p ON sa.IDProduct = p.RefNum
      JOIN [User] u ON s.IDUser = u.IDEmail
      JOIN JobPosition jp ON u.IDJobPosition = jp.ID
      JOIN Team t ON jp.IDTeam = t.ID
      WHERE 
        s.IDPhase = 5 
        AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
        AND t.ID = (
          SELECT jp2.IDTeam 
          FROM [User] u2 
          JOIN JobPosition jp2 ON u2.IDJobPosition = jp2.ID 
          WHERE u2.IDEmail = @iduser
        )
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
      DECLARE @UserEmail VARCHAR(255) = @iduser;
      DECLARE @TeamID INT = (
        SELECT jp.IDTeam 
        FROM [User] u
        JOIN JobPosition jp ON u.IDJobPosition = jp.ID
        WHERE u.IDEmail = @UserEmail
      );
      IF @TeamID IS NULL
      BEGIN
        SELECT 'Usuario no encontrado' AS Resultado;
      END
      ELSE
      BEGIN
        SELECT 
          u.IDEmail AS UsuarioID,
          u.Name + ' ' + u.LastName AS NombreCompleto,
          COALESCE(SUM(sa.Quantity * p.UnitaryPrice * p.Commission), 0) AS TotalComisiones,
          COUNT(DISTINCT CASE WHEN s.IDPhase = 5 THEN s.ID END) AS VentasCerradas,
          COUNT(DISTINCT CASE WHEN s.IDPhase IN (2, 3, 4) THEN s.ID END) AS Activas,
          COUNT(DISTINCT CASE WHEN s.IDPhase = 6 THEN s.ID END) AS Canceladas,
          (SELECT TeamName FROM Team WHERE ID = @TeamID) AS Equipo
        FROM dbo.[User] u
        JOIN JobPosition jp ON u.IDJobPosition = jp.ID
        LEFT JOIN Sale s ON u.IDEmail = s.IDUser
        LEFT JOIN SaleArticle sa ON s.ID = sa.IDSale
        LEFT JOIN Product p ON sa.IDProduct = p.RefNum
        WHERE jp.IDTeam = @TeamID
        GROUP BY u.IDEmail, u.Name, u.LastName, u.PhoneNumber
        ORDER BY TotalComisiones DESC;
      END;`);
    return result.recordset;
  }

  async getDailyClosedSalesByTeam(iduser: string) {
    const request = await this.pool.request();
    const result = await request.input('iduser', sql.VarChar, iduser).query(`
      DECLARE @UserEmail VARCHAR(255) = @iduser;
      WITH DaysOfMonth AS (
        SELECT TOP (DAY(EOMONTH(GETDATE())))
          ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS DiaDelMes
        FROM master.dbo.spt_values
      ),
      TeamUsers AS ( 
        SELECT u.IDEmail
        FROM [User] u
        INNER JOIN JobPosition jp ON u.IDJobPosition = jp.ID
        INNER JOIN Team t ON jp.IDTeam = t.ID
        WHERE t.ID = (
          SELECT jp2.IDTeam
          FROM [User] u2
          INNER JOIN JobPosition jp2 ON u2.IDJobPosition = jp2.ID
          WHERE u2.IDEmail = @UserEmail
        )
      ),
      VentasPorDia AS (
        SELECT
          DAY(s.StartDate) AS DiaDelMes,
          COUNT(*) AS VentasCerradas
        FROM Sale s
        INNER JOIN TeamUsers tu ON s.IDUser = tu.IDEmail
        WHERE
          s.IDPhase = 5
          AND MONTH(s.StartDate) = MONTH(GETDATE())
          AND YEAR(s.StartDate) = YEAR(GETDATE())
        GROUP BY DAY(s.StartDate)
      )
      SELECT 
        d.DiaDelMes,
        ISNULL(v.VentasCerradas, 0) AS VentasCerradas
      FROM DaysOfMonth d
      LEFT JOIN VentasPorDia v ON d.DiaDelMes = v.DiaDelMes
      ORDER BY d.DiaDelMes;
    `);
    return result.recordset;
  }

  async getSalesInfoByEmail(email: string): Promise<any> {
    const request = await this.pool.request();
    const result = await request.input('email', sql.VarChar, email).query(`
    SELECT 
      u.IDEmail AS UsuarioID,
      u.Name + ' ' + u.LastName AS NombreCompleto,
      COUNT(DISTINCT CASE WHEN ph.ID = 5 THEN s.ID END) AS VentasCerradas,
      COUNT(DISTINCT CASE WHEN ph.ID IN (2,3,4) THEN s.ID END) AS Activas,
      COUNT(DISTINCT CASE WHEN ph.ID = 6 THEN s.ID END) AS Canceladas,
      ISNULL(SUM(CASE WHEN ph.ID = 5 THEN sa.Quantity * pr.UnitaryPrice * pr.Commission END), 0) AS TotalComisiones
    FROM [User] u
    LEFT JOIN Sale s ON u.IDEmail = s.IDUser
    LEFT JOIN Phase ph ON s.IDPhase = ph.ID
    LEFT JOIN SaleArticle sa ON sa.IDSale = s.ID
    LEFT JOIN Product pr ON pr.RefNum = sa.IDProduct
    WHERE u.IDEmail = @email
    GROUP BY u.IDEmail, u.Name, u.LastName
    `);
    return result.recordset;
  }

  async getDailyClosedSalesByEmail(email: string) {
    const request = await this.pool.request();
    const result = await request.input('email', sql.VarChar, email).query(`
      SELECT 
        DAY(s.StartDate) AS DiaDelMes, 
        COUNT(*) AS VentasCerradas
      FROM Sale s
      WHERE 
        s.IDUser = @email
        AND s.IDPhase = 5
        AND MONTH(s.StartDate) = MONTH(GETDATE())
        AND YEAR(s.StartDate) = YEAR(GETDATE())
      GROUP BY DAY(s.StartDate)
      ORDER BY DiaDelMes
    `);
    return result.recordset;
  }

  async getSalesInfoTeam(email: string) {
    try {
      const request = await this.pool.request();
  
      const result = await request
        .input('Email', sql.VarChar, email)
        .query(`
          WITH UserTeam AS (
            SELECT TOP 1 jp.IDTeam
            FROM [User] u
            JOIN JobPosition jp ON u.IDJobPosition = jp.ID
            WHERE u.IDEmail = @Email
          )
  
          SELECT 
            t.TeamName AS Equipo,
            COALESCE(SUM(sa.Quantity * p.UnitaryPrice * p.Commission), 0) AS TotalComisiones,
            COUNT(DISTINCT CASE WHEN s.IDPhase = 5 THEN s.ID END) AS VentasCerradas,
            COUNT(DISTINCT CASE WHEN s.IDPhase IN (2, 3, 4) THEN s.ID END) AS Activas,
            COUNT(DISTINCT CASE WHEN s.IDPhase = 6 THEN s.ID END) AS Canceladas
          FROM [User] u
          JOIN JobPosition jp ON u.IDJobPosition = jp.ID
          JOIN UserTeam ut ON jp.IDTeam = ut.IDTeam
          JOIN Team t ON jp.IDTeam = t.ID
          LEFT JOIN Sale s ON u.IDEmail = s.IDUser
          LEFT JOIN SaleArticle sa ON s.ID = sa.IDSale
          LEFT JOIN Product p ON sa.IDProduct = p.RefNum
          GROUP BY t.TeamName;
        `);
  
      return result.recordset;
    } catch (error) {
      throw new Error('No se pudo obtener la información del equipo.');
    }
  }
  

}

export default DbService;