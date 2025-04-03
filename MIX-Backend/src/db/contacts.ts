//* 4. DB Contact

import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class ContactService {
  private db: typeof pool;

  constructor(db: typeof pool) {
    this.db = db;
  }

  async getAllContacts() {
    const result = await this.db.query(
      'SELECT * FROM contacts'
    );
    return result.rows;
  }

  async getContactById(id: string) {
    const result = await this.db.query(
      ''
    );
    return result.rows;
  }

  async createContact(data: any[]) {
    await this.db.query(
      ''
    );
  }

  async updateContact(id: string, data: any[]) {
    await this.db.query(
      ''
    );
  }

  async deleteContact(id: string) {
    await this.db.query(
      ''
    );
  }

  async getContactByName(name: string) {
    const result = await this.db.query(
      ''
    );
    return result.rows;
  }

  async getContactByEnterprise(enterprise: string) {
    const result = await this.db.query(
      ''
    );
    return result.rows;
  }
}

export default new ContactService(pool);