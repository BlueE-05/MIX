import SaleService from "../db/sale";

class SaleController {
  private saleService = new SaleService;

  async getAllSales(id: string) {
    return this.saleService.getAllSales(id);
  }

 
  async getSaleByEnt(ent: string, iduser: string) {
    return this.saleService.getSaleByEnt(ent, iduser);
  }

  async getKNnum(idsale: number, iduser: number) {
    return this.saleService.getKNnum(idsale, iduser);
  }

  async getKNinfo(idsale: number, iduser: number) {
    return this.saleService.getKNinfo(idsale, iduser);
  }

  async getFormInfo(idsale: number, iduser: number) {
    return this.saleService.getFormInfo(idsale, iduser);
  }

  async getFormNum(idsale: number, iduser: number) {
    return this.saleService.getFormNum(idsale, iduser);
  }

  async deleteSale(idsale: number, iduser: number): Promise<boolean> {
    return this.saleService.deleteSale(idsale, iduser);
  }

  async getAllEnt() {
    return this.saleService.getAllEnt();
  }

  async getAllProd() {
    return this.saleService.getAllProd();
  }

  async getTopSales(iduser: string) {
    return this.saleService.getTopSales(iduser);
  }

  

}

export default new SaleController();


//EN CASO DE QUE NO FUNCIONE LA OTRA FUNCIÓN
/*
  async getKNnum(idsale: number, iduser: number) {
    try {
      const result = await this.saleService.getKNnum(idsale, iduser);
      return {
        success: true,
        data: result
      };
      
    } catch (error) {
      console.error('❌ Error en SaleController.getTest:', error);
      return {
        success: false,
        message: 'Ocurrió un error al obtener el resumen de la venta.',
        error
      };
    }
  }
    */



//DEJAR POR EL MOMENTO PARA PRUEBAS SI FALLA
/*import { poolPromise } from '../database';

class ReportService{
    async getAllCierre() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT COUNT(ID) AS Total_Cierre FROM Sale WHERE IDPhase = 3 AND IDUser = 1');
    console.log('✅ Conexión exitosa');
    return result.recordset;
    }

  
    async getAllCotizacion() {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT COUNT(ID) AS Total_Cotizacion FROM Sale WHERE IDPhase=2 AND IDUser = 1');
      console.log('✅ Conexión exitosa');
      return result.recordset;
    }


    async getAllProspecto() {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT COUNT(ID) AS Total_Prospecto FROM Sale WHERE IDPhase=1 AND IDUser = 1');
      console.log('✅ Conexión exitosa');
      return result.recordset;
    }


    async getTotalComissions() {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT SUM(p.Commission * sa.Quantity) AS TotalCommissions FROM SaleArticle sa JOIN Product p ON sa.IDProduct = p.RefNum JOIN Sale s ON sa.IDSale = s.ID WHERE s.IDUser = 1');    

      console.log('✅ Conexión exitosa');
      return result.recordset;
    }

}
export default ReportService;
*/

