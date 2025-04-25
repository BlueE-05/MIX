//* 4. DB Contact

import sql from 'mssql';
import config from '@/db/config';
import EnterpriseDB from '@/types/db/EnterpriseDB';
import Enterprise from '@/types/controller/Enterprise';

export default class ContactService {
  private pool: sql.ConnectionPool;

  constructor() {
    this.pool = new sql.ConnectionPool(config);
    
    this.pool.connect().catch(err => {
      console.error('Error connecting to the database', err);
    });
  }

  async getEnterprise(): Promise<Enterprise[]> {
    const result = await this.pool.request()
      .query(
        `SELECT 
          ID, 
          Name
        FROM [Enterprise];`
      );
    return result.recordset;
  }

  async createEnterprise(enterpriseData: EnterpriseDB): Promise<void> {
    await this.pool.request()
      .input('name', sql.VarChar, enterpriseData.name)
      .input('description', sql.VarChar, enterpriseData.description)
      .input('industry', sql.VarChar, enterpriseData.industry)
      .input('website', sql.VarChar, enterpriseData.website)
      .input('address', sql.VarChar, enterpriseData.address)
      .query(
        `INSERT INTO Enterprise (Name, Description, Industry, WebPage, Location)
        VALUES (@name, @description, @industry, @website, @address);`
      );
  }
}