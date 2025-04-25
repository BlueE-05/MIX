import NewSaleService from "../db/newsale";

class NewSaleController {
  private newsaleService = new NewSaleService;

  async getAllContactByUser(IDUser: string) {
    return this.newsaleService.getAllContactByUser(IDUser);
  }

  async getPrice(idprod: string) {
    return this.newsaleService.getPrice(idprod);
  }


  async getPhases() {
    return this.newsaleService.getPhases();
  }

  async getAllProd() {
    return this.newsaleService.getAllProd();
  }
  

  async createSale(iduser: string, data: { idcont: number; idphase: number}) {
    return this.newsaleService.createSale(iduser,data);
  } 

  async createSaleONE(iduser: string, data: {idcont:number, idphase:number, idprod:string, quant:number }) {
    return this.newsaleService.createSaleONE(iduser,data);
  } 

  
  async createSaleMULT(
    iduser: string, 
    data: {
        idcont: number,
        idphase: number,
        products: {  // Usamos 'products' en lugar de 'quantinfo'
            idprod: string, 
            quant: number 
        }[]
    }
) {
    // Transformamos los datos al formato que espera el service
    const saleData = {
        UserID: iduser,
        ContactID: data.idcont,
        PhaseID: data.idphase,
        Products: data.products.map(item => ({
            ProductID: item.idprod,
            Quantity: item.quant
        }))
    };

    return this.newsaleService.createSaleMULT(saleData);
}
    


    


}

export default new NewSaleController();
