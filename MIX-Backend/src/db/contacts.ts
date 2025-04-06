//* 4. DB Contact

import sql from 'mssql';
import config from '@/db/config';

export default class ContactService {
  private pool: sql.ConnectionPool;

  constructor() {
    this.pool = new sql.ConnectionPool(config);
    // Conectar al pool una sola vez al crear la instancia
    this.pool.connect().catch(err => {
      console.error('Error connecting to the database', err);
    });
  }

  async getAllContacts(idUser: number) {
    const result = await this.pool
      .request()
      .input('idUser', idUser)
      .query(
        `SELECT 
          c.ID, 
          c.Name, 
          c.LastName, 
          c.Email, 
          c.PhoneNumber,
          e.Name AS EnterpriseName,
          c.CreationDate, 
          c.LastInteraction
        FROM Contact c
        JOIN Enterprise e ON c.IDEnterprise = e.ID
        WHERE c.IDUser = @idUser
        ORDER BY c.LastInteraction DESC`
      );
    return result.recordset;
  }

  async getContactById(id: number) {
    const result = await this.pool.request()
      .input('id', sql.Int, id)
      .query(
        `SELECT 
          c.ID, 
          c.Name, 
          c.LastName, 
          c.Email, 
          c.PhoneNumber,
          e.Name AS EnterpriseName,
          c.CreationDate, 
          c.LastInteraction
        FROM Contact c
        JOIN Enterprise e ON c.IDEnterprise = e.ID
        WHERE c.ID = @id`
      );
    return result.recordset;
  }

  async getContactByName(idUser: number, name: string) {
    const result = await this.pool.request()
      .input('name', sql.VarChar, name)
      .input('idUser', sql.Int, idUser)
      .query(
        `SELECT 
          c.ID, 
          c.Name, 
          c.LastName, 
          c.Email, 
          c.PhoneNumber,
          e.Name AS EnterpriseName,
          c.CreationDate, 
          c.LastInteraction
        FROM Contact c
        JOIN Enterprise e ON c.IDEnterprise = e.ID
        WHERE c.IDUser = @idUser 
          AND (c.Name = @name OR c.LastName = @name)
        ORDER BY c.LastInteraction DESC`
      );
    return result.recordset;
  }

  async getContactByEnterprise(idUser: number, enterprise: string) {
    const result = await this.pool.request()
      .input('idUser', sql.Int, idUser)
      .input('enterprise', sql.VarChar, enterprise)
      .query(
        `SELECT 
          c.ID, 
          c.Name, 
          c.LastName, 
          c.Email, 
          c.PhoneNumber,
          e.Name AS EnterpriseName,
          c.CreationDate, 
          c.LastInteraction
        FROM Contact c
        JOIN Enterprise e ON c.IDEnterprise = e.ID
        WHERE c.IDUser = @idUser AND e.Name = @enterprise
        ORDER BY c.LastInteraction DESC`
      );
    return result.recordset;
  }

  async createContact(idUser: number, data: { name: string; lastName: string; email: string; phoneNumber: number; nameEnterprise: string }) {
    await this.pool.request()
      .input('idUser', sql.Int, idUser)
      .input('name', sql.VarChar, data.name)
      .input('lastName', sql.VarChar, data.lastName)
      .input('email', sql.VarChar, data.email)
      .input('phoneNumber', sql.VarChar, data.phoneNumber)
      .input('nameEnterprise', sql.VarChar, data.nameEnterprise)
      .query(
        `INSERT INTO Contact (Name, LastName, Email, PhoneNumber, CreationDate, LastInteraction, IDUser, IDEnterprise)
        SELECT @name, @lastName, @email, @phoneNumber, GETDATE(), GETDATE(), @idUser, e.ID
        FROM Enterprise e WHERE e.Name = @nameEnterprise`
      );
  }

  async updateContact(id: number, data: { name: string; lastName: string; email: string; phoneNumber: number }) {
    await this.pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.VarChar, data.name)
      .input('lastName', sql.VarChar, data.lastName)
      .input('email', sql.VarChar, data.email)
      .input('phoneNumber', sql.VarChar, data.phoneNumber)
      .query(
        `UPDATE Contact
        SET
          Name = @name,
          LastName = @lastName,
          Email = @email,
          PhoneNumber = @phoneNumber,
          LastInteraction = GETDATE()
        WHERE ID = @id`
      );
  }

  async deleteContact(id: number) {
    await this.pool.request()
      .input('id', sql.Int, id)
      .query(
        'DELETE FROM Contact WHERE ID = @id'
      );
  }
}