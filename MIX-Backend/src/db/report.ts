import { poolPromise } from '../database';
import sql from 'mssql';

class ReportService{


  //Considerar Cierre como ID=3 en Phase
  async getAllCierre(id: number) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.Int, id).query('SELECT COUNT(ID) FROM Sale WHERE IDPhase = 3 AND IDUser = @id');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllCierre:', error);
        throw new Error('Error al obtener cierres');
    }
  }

  //Considerar Cotizacion como ID=2 en Phase
  async getAllCotizacion(id: number) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.Int, id).query('SELECT COUNT(ID) AS Total_Cotizacion FROM Sale WHERE IDPhase = 2 AND IDUser = @id');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en getAllCotizacion:', error);
        throw new Error('Error al obtener cotizacion');
    }
  }

  //Considerar Prospecto como ID=1 en Phase
  async getAllProspecto(id: number) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.Int, id).query('SELECT COUNT(ID) AS Total_Prospecto FROM Sale WHERE IDPhase = 1 AND IDUser = @id');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en Prospecto:', error);
        throw new Error('Error al obtener prospecto');
    }
  }

  //NOTAS DE CAMBIOS: Agregar funcion para las nuevas fases
  
  //Calcular comisiones de un solo usuario
  async getTotalComissions(id: number) {
    try {
        const pool = await poolPromise;
        const request = pool.request();
        const result = await request.input('id', sql.Int, id).query('SELECT SUM(p.Commission * sa.Quantity) AS TotalCommission FROM Users AS u JOIN Sale AS s ON u.ID = s.IDUser JOIN SaleArticle AS sa ON s.ID = sa.IDSale JOIN Product AS p ON sa.IDProduct = p.RefNum WHERE u.ID = @id GROUP BY u.ID, u.Name');
        return result.recordset;
    } catch (error) {
        console.error('❌ Error en Prospecto:', error);
        throw new Error('Error al obtener prospecto');
    }
  }

  //Lo que falta
  //Trigger para que se actualice las tablas y graficas cada cambio de mes
  //Hacer la gráfica de lineas

}
export default ReportService;

