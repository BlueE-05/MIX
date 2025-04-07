/*import { Pool } from "pg";
const pool = new Pool({ connectionString: process.env.DATABASE_URL });


class NewSaleService {
    private db: Pool;
    constructor(db: Pool) {
      this.db = db;
    }


    //Mostrar la información de un contacto seleccionado en la lista
    async getContactoByID(id: number): Promise<any[]> {
        const result = await this.db.query('SELECT c.Email, e.Name AS Enterprise, c.PhoneNumber FROM Contact c JOIN Enterprise e ON c.IDEnterprise = e.ID WHERE c.ID = $1;',[id]);
        return result.rows;
      }

    //Ingresar datos para una nueva venta
    async createNewSale(iduser: number, idcontact: number, startdate: Date, enddate: Date, idphase: number): Promise<any[]> {
        const result = await this.db.query('INSERT INTO Sale (IDUser, IDContact, StartDate, EndDate, IDPhase)VALUES ($1, $2, $3, $4, %4, ?5)',[iduser, idcontact, startdate, enddate, idphase]);
        return result.rows;
    }

    //Desplegar lista de nombres de contactos
    async getAllContacts(): Promise<any[]> {
        const result = await this.db.query('SELECT CONCAT(Name, " ", LastName) AS FullName FROM Contact');
        return result.rows;
    }


}

export default new NewSaleService(pool);
*/