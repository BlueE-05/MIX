import NewSaleService from "../db/newsale";

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