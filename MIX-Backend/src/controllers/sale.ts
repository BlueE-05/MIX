import SaleService from "../db/sale";

class SaleController {
  private saleService = new SaleService;

  async getAllSales(id: number) {
    return this.saleService.getAllSales(id);
  }

  async getSaleByFase(idfase: number, iduser: number) {
    return this.saleService.getSaleByFase(idfase, iduser);
  }

  async getSaleByEnt(ent: string, iduser: number) {
    return this.saleService.getSaleByEnt(ent, iduser);
  }

}

export default new SaleController();


/*
import SaleService from "../db/sale";

class SaleController {
  private SaleService: typeof SaleService;

  constructor() {
    this.SaleService = SaleService;
  }

    async getSaleByID(id: number) {
        return await this.SaleService.getSaleByID(id);
    }

    async getSaleByPhase(id: number) {
        return await this.SaleService.getSaleByPhase(id);
    }

}

export default new SaleController;
*/