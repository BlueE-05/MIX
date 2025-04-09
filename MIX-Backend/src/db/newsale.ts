import { poolPromise } from '../database';
import sql from 'mssql';

class NewSaleService{


  //Desplegar todos los contactos que haya registrado un User en especifico
  async getAllContactByUser(id: number) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.Int, id).query('SELECT CONCAT(c.Name , \' \' , c.LastName) AS FullName FROM Contact AS c WHERE c.IDUser = @id');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllCierre:', error);
        throw new Error('Error al obtener cierres');
    }
  }

  //Mostrar la informacion de un contacto que se haya seleccionado por el usuario
  async getInfoContacto(id: number, cont: number) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)  
            .input('cont', sql.Int, cont)  
            .query('SELECT c.Email,e.Name AS EnterpriseName, c.PhoneNumber FROM Contact AS c INNER JOIN Enterprise AS e ON c.IDEnterprise = e.ID WHERE c.ID = @cont AND c.IDUser = @id');
        
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getInfoContacto:', error);
        throw new Error('Error al obtener información del contacto');
    }
  }

  //Desplegar todas las fases de la venta para seleccionar
  async getPhases() {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.query('select Name from Phase;');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllCierre:', error);
        throw new Error('Error al obtener cierres');
    }
  }


    //Nota: Hacer modificaciones para que al momento de seleccionar la informacion en la pantalla esta sea la info que se guarda para la nueva sale
    //Nota: Recordar que hay que cambair la fecha de fin con un triger o algo al momento de cerrar realmente la venta 
    async createSale(iduser: number, idcont: number, startdate: string, enddate: string, idphase: number) {
      try {
          const pool = await poolPromise;
          const result = await pool.request()
              .input('iduser', sql.Int, iduser)  
              .input('idcont', sql.Int, idcont)  
              .input('startdate', sql.Date, startdate)
              .input('enddate', sql.Date, enddate)
              .input('idphase', sql.Int, idphase)
              .query('INSERT INTO Sale (IDUser, IDContact, StartDate, EndDate, IDPhase)VALUES (@iduser, @idcont, @startdate, @enddate, idphase)');
          return result.recordset;
      } catch (error) {
          console.error('❌ Error en getInfoContacto:', error);
          throw new Error('Error al obtener información del contacto');
      }
    }

  

  

}
export default NewSaleService;


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