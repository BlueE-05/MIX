import sql from 'mssql';
import config from '@/db/config';

class NewSaleService {
    private pool: sql.ConnectionPool;

    constructor() {
      this.pool = new sql.ConnectionPool(config);
      // Conectar al pool una sola vez al crear la instancia
      this.pool.connect().catch(err => {
        console.error('Error connecting to the database', err);
      });
    }
  //Desplegar todos los contactos que haya registrado un User en especifico
  //LISTO
  async getAllContactByUser(id: string) {
    try {
        const pool = await this.pool;
        const request = pool.request();
        const result = await request.input('id', sql.VarChar, id).query(
        `SELECT 
        c.Name + ' ' + c.LastName AS FullName,
        c.ID as IDContact
        FROM Contact as c
        WHERE c.IDUser = @id
        ORDER BY c.Name, c.LastName, c.ID`);
        return result.recordset;
    } catch (error) {
        console.error('Error en getAllCierre:', error);
        throw new Error('Error al obtener contactos by user');
    }
  }


  //Obtener el precio de los productos
  //LISTO
  async getPrice(idprod: string) {
    try {
        const pool = await this.pool;
        const result = await pool.request() 
            .input('idprod', sql.VarChar, idprod)  
            .query(`SELECT UnitaryPrice AS Price FROM Product WHERE RefNum = @idprod`);
        return result.recordset;
    } catch (error) {
        console.error('Error en getPrice:', error);
        throw new Error('Error al obtener price');
    }
  }

  //Desplegar todas las fases de la venta para seleccionar
  //LISTO
  async getPhases() {
    try {
        const pool = await this.pool;
        const request = pool.request();
        const result = await request.query('select Name, ID as IDPhase from Phase');
        return result.recordset;
    } catch (error) {
        console.error('Error en getAllCierre:', error);
        throw new Error('Error al obtener cierres');
    }
  }

  async getAllProd() {
    try {
        const pool = await this.pool;
        const request = pool.request();
        const result = await request.query(`SELECT Name AS NombreArticulo, RefNum as IDProd FROM Product ORDER BY Name`);
        return result.recordset;
    } catch (error) {
        console.error('Error en getAllProd', error);
        throw new Error('Error al obtener productos');
    }
  }

    //Crear una nueva venta con multiples productos
    //NO FUNCIONA /REVISAR
    async createSaleMULT(
        data: { 
            UserID: string,
            ContactID: number, 
            PhaseID: number, 
            Products: { ProductID: string, Quantity: number }[] 
        }
    ) {
        const pool = await this.pool;
        
        // Validate input
        if (!data.UserID || !data.ContactID || !data.PhaseID || !data.Products || !Array.isArray(data.Products)) {
            throw new Error('Invalid service input data');
        }
    
        // Convert products array to JSON string
        const productsJSON = JSON.stringify(data.Products);
    
        try {
            const result = await pool.request()
                .input('userID', sql.VarChar, data.UserID)
                .input('contactID', sql.Int, data.ContactID)
                .input('phaseID', sql.Int, data.PhaseID)
                .input('productsJSON', sql.NVarChar(sql.MAX), productsJSON) // Fixed: using productsJSON instead of data.Products
                .query(`EXEC sp_CreateNewSaleMultProds
                        @UserID = @userID,
                        @ContactID = @contactID,
                        @PhaseID = @phaseID,
                        @ProductsJSON = @productsJSON`);
            // Get the new sale ID from the result
            if (!result.recordset[0]?.NewSaleID) {
                throw new Error('Failed to get new sale ID');
            }
            return result.recordset[0].NewSaleID;
        } catch (error) {
            console.error('Error in createSaleMULT:', error);
            throw new Error('Failed to create new sale');
        }
    } 
}
              
export default NewSaleService;


