//* 4. DB Products

import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class ProductService {
  private db: typeof pool;

  constructor(db: typeof pool) {
    this.db = db;
  }

  async getAllProducts() {
    const result = await this.db.query(
      'SELECT * FROM products'
    );
    return result.rows;
  }

  async getProductById(id: string) {
    const result = await this.db.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  async getProductByName(name: string) {
    const result = await this.db.query(
      'SELECT * FROM products WHERE name = $1',
      [name]
    );
    return result.rows[0];
  }

  async getProductByEnterprise(enterprise: string) {
    const result = await this.db.query(
      'SELECT * FROM products WHERE enterprise = $1',
      [enterprise]
    );
    return result.rows;
  }

  async createProduct(data: any[]) {
    await this.db.query(
      'INSERT INTO products (name, price, enterprise) VALUES ($1, $2, $3)',
      data
    );
  }

  async updateProduct(id: string, data: any[]) {
    await this.db.query(
      'UPDATE products SET name = $1, price = $2, enterprise = $3 WHERE id = $4',
      [...data, id]
    );
  }

  async deleteProduct(id: string) {
    await this.db.query(
      'DELETE FROM products WHERE id = $1',
      [id]
    );
  }
}

export default new ProductService(pool);