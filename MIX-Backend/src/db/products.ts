import sql from 'mssql';

import config from '@/db/config';

export default class ProductService {
  private pool: sql.ConnectionPool;

  constructor() {
    this.pool = new sql.ConnectionPool(config);
    this.pool.connect(); // Conectar una vez al iniciar
  }

  async getAllProducts() {
    const result = await this.pool.request().query(
      'SELECT * FROM Product ORDER BY RefNum ASC'
    );
    return result.recordset;
  }

  async getProductById(id: string) {
    const result = await this.pool.request()
      .input('id', sql.VarChar, id)
      .query(
        'SELECT * FROM Product WHERE RefNum = @id'
      );
    return result.recordset[0];
  }

  async getProductByName(name: string) {
    const result = await this.pool.request()
      .input('name', sql.VarChar, name)
      .query(
        'SELECT * FROM Product WHERE name = @name'
      );
    return result.recordset[0];
  }

  async createProduct(data: { id: string; name: string; description: string; type: boolean; price: number; commission: number }) {
    const result = await this.pool.request()
      .input('id', sql.VarChar, data.id)
      .input('name', sql.VarChar, data.name)
      .input('description', sql.VarChar, data.description)
      .input('type', sql.Bit, data.type)
      .input('price', sql.Decimal(18, 2), data.price)
      .input('commission', sql.Decimal(18, 2), data.commission)
      .query(
              `INSERT INTO Product (RefNum, Name, Description, ArticleType, UnitaryPrice, Commission, CreationDate)
              OUTPUT INSERTED.*
              VALUES (@id, @name, @description, @type, @price, @commission, GETDATE())`
            );
    return result.recordset[0];
  }

  async updateProduct(id: string, data: { name: string; description: string; type: boolean ; price: number; commission: number }) {
    const result = await this.pool.request()
      .input('id', sql.VarChar, id)
      .input('name', sql.VarChar, data.name)
      .input('description', sql.VarChar, data.description)
      .input('type', sql.Bit, data.type)
      .input('price', sql.Decimal(18, 2), data.price)
      .input('commission', sql.Decimal(18, 2), data.commission)
      .query(`UPDATE Product
              SET Name = @name,
                Description = @description,
                ArticleType = @type,
                UnitaryPrice = @price,
                Commission = @commission
              OUTPUT INSERTED.*
              WHERE RefNum = @id`
            );
    return result.recordset[0];
  }

  async deleteProduct(id: string) {
    await this.pool.request()
      .input('id', sql.VarChar, id)
      .query(
        'DELETE FROM Product WHERE RefNum = @id'
      );
  }
}