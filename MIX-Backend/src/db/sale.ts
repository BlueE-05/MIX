import sql from 'mssql';
import config from '@/db/config';
import { Sale, Product } from '@/types/controller/Sale';
import Enterprise from '@/types/controller/Enterprise';

export default class SaleService {
  private pool: sql.ConnectionPool;

  constructor() {
    this.pool = new sql.ConnectionPool(config);
    this.pool.connect().catch(err => {
      console.error('Error connecting to the database', err);
    });
  }

  async closePool(): Promise<void> {
    try {
      await this.pool.close();
    } catch (err) {
      console.error('Error closing connection pool', err);
    }
  }

  // Obtener todas las ventas de un usuario
  async getAllSales(id: string): Promise<Sale[]> {
    const result = await this.pool.request()
      .input('id', sql.VarChar, id)
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
        WHERE s.IDUser = @id
        GROUP BY s.ID, e.Name, ph.Name, s.StartDate
        ORDER BY s.StartDate DESC`
      );
    return result.recordset;
  }

  // Obtener ventas por empresa
  async getSaleByEnt(ent: string, iduser: string): Promise<Sale[]> {
    const result = await this.pool.request()
      .input('ent', sql.VarChar, ent)
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
        ORDER BY s.StartDate DESC`
      );
    return result.recordset;
  }

  // Obtener todas las empresas
  async getAllEnt(): Promise<Enterprise[]> {
    const result = await this.pool.request()
      .query('SELECT ID as IDSale, Name as EntName FROM Enterprise');
    return result.recordset;
  }

  // Obtener todos los productos
  async getAllProd(): Promise<Product[]> {
    const result = await this.pool.request()
      .query('SELECT RefNum as refnum, Name as NameProd, UnitaryPrice as UnPrice FROM Product');
    return result.recordset;
  }

  // Eliminar una venta
  async deleteSale(idsale: number): Promise<void> {
    await this.pool.request()
      .input('idsale', sql.Int, idsale)
      .query(`EXEC sp_DeleteSaleAndRelatedData @SaleID = @idsale;`);
  }

  // Obtener las últimas 10 ventas registradas en el mes
  async getTopSales(iduser: string): Promise<Sale[]> {
    const result = await this.pool.request()
      .input('iduser', sql.VarChar, iduser)
      .query(
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
        ORDER BY s.StartDate DESC`
      );
    return result.recordset;
  }

  // Actualizar la fase de la venta
  async updatePhaseSale(idsale: number, idphase: number): Promise<void> {
    await this.pool.request()
      .input('idsale', sql.Int, idsale)
      .input('idphase', sql.Int, idphase)
      .query(`EXEC sp_UpdateSalePhase @SaleID = @idsale, @NewPhaseID = @idphase`);
  }
}