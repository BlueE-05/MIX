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
    return this.newsaleService.createSaleOne(iduser,data);
  } 
  
    


    


}

export default new NewSaleController();
