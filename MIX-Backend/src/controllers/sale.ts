import SaleService from "../db/sale";

class SaleController {
  private saleService = new SaleService;

  async getAllSales(id: string) {
    return this.saleService.getAllSales(id);
  }

  async getSaleByEnt(ent: string, iduser: string) {
    return this.saleService.getSaleByEnt(ent, iduser);
  }

  async deleteSale(idsale: number) {
    return this.saleService.deleteSale(idsale);
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

  async updatePhaseSale(idsale: number, idphase:number) {
    return this.saleService.updatePhaseSale(idsale, idphase);
  }

  

}

export default new SaleController();


