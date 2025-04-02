//* DB Contact

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
}

export default new ContactService(pool);