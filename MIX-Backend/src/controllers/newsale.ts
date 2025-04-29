import NewSaleService from "../db/newsale";

export default class NewSaleController {
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

  
  async createSaleMULT(
    iduser: string, 
    data: {
        idcont: number,
        idphase: number,
        products: {
            idprod: string, 
            quant: number 
        }[]
    }
) {
    // Input validation
    if (!iduser || !data.idcont || !data.idphase || !data.products || !Array.isArray(data.products)) {
        throw new Error('Invalid input data');
    }

    // Transform data to service format
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
