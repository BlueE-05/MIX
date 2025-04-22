import NewSaleService from "../db/newsale";

class NewSaleController {
  private newsaleService = new NewSaleService;

  async getAllContactByUser(IDUser: number) {
    return this.newsaleService.getAllContactByUser(IDUser);
  }

  async getInfoContacto(id: number, cont: number) {
    return this.newsaleService.getInfoContacto(id, cont);
  }

  async getPhases() {
    return this.newsaleService.getPhases();
  }
  
/*
  async createSale(data: {iduser: number; idcont: number; idphase: number}) {
    return this.newsaleService.createSale(data);
  } 
  */
    


    


}

export default new NewSaleController();





/*import NewSaleService from "../db/newsale";

class NewSaleController {
  private NewSaleService: typeof NewSaleService;

  constructor() {
    this.NewSaleService = NewSaleService;
  }

    async getContactoByID(id: number) {
        return await this.NewSaleService.getContactoByID(id);
    }

    async createNewSale(iduser: number, idcontact: number, startdate: Date, enddate: Date, idphase: number) {
        return await this.NewSaleService.createNewSale(iduser, idcontact, startdate, enddate, idphase);
    }

    async getAllContacts() {
        return await this.NewSaleService.getAllContacts();
    }

 

}

export default new NewSaleController;
*/