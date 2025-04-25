import { poolPromise } from '../database';
import sql from 'mssql';

class NewSaleService{

  //Desplegar todos los contactos que haya registrado un User en especifico
  //LISTO
  async getAllContactByUser(id: string) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.VarChar, id).query(
        `SELECT 
        c.Name + ' ' + c.LastName AS FullName
        FROM Contact c
        WHERE c.IDUser = 'ana.gomez@empresa.com'
        ORDER BY c.Name, c.LastName`);
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllCierre:', error);
        throw new Error('Error al obtener cierres');
    }
  }


  //Obtener el precio de los productos
  //LISTO
  async getPrice(idprod: string) {
    try {
        const pool = await poolPromise;
        const result = await pool.request() 
            .input('idprod', sql.VarChar, idprod)  
            .query(`SELECT UnitaryPrice AS Price FROM Product WHERE RefNum = @idprod`);
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getPrice:', error);
        throw new Error('Error al obtener price');
    }
  }

  //Desplegar todas las fases de la venta para seleccionar
  //LISTO
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

  async getAllProd() {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.query(`SELECT Name AS NombreArticulo, RefNum as IDProd FROM Product ORDER BY Name`);
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllProd', error);
        throw new Error('Error al obtener productos');
    }
  }



    //NOTA: Pendiente
    //Nota: Hacer modificaciones para que al momento de seleccionar la informacion en la pantalla esta sea la info que se guarda para la nueva sale
    //Nota:*** Recordar que hay que cambair la fecha de fin con ue:numbern triger o algo al momento de cerrar realmente la venta 
    //MODIFICAR: Quitar enddate, startdate automatimo la fecha actual
   
    async createSale(iduser: string, data: { idcont: number; idphase: number}) {
          const pool = await poolPromise;
          const result = await pool.request()
              .input('iduser', sql.VarChar, iduser)  
              .input('idcont', sql.Int, data.idcont)  
              .input('idphase', sql.Int, data.idphase)
              .query('INSERT INTO Sale (IDUser, IDContact, IDPhase)VALUES (@iduser, @idcont, @idphase)');
    }

    //Prueba de nueva venta con un solo producto
    //Revisar
    async createSaleOne(iduser: string, data: { idcont:number, idphase:number, idprod:string, quant:number }) {
      const pool = await poolPromise;
      const result = await pool.request()
          .input('iduser', sql.VarChar, iduser)  
          .input('idcont', sql.Int, data.idcont)  
          .input('idphase', sql.Int, data.idphase)
          .input('idprod', sql.VarChar, data.idprod)
          .input('quant', sql.Int, data.quant)
          .query(`EXEC sp_CreateNewSale 
                  @UserID = @iduser,
                  @ContactID = @idcont,
                  @PhaseID = @idphase,
                  @ProductID = @idprod,
                  @Quantity = @quant`);
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