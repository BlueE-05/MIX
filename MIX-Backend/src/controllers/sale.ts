// * Controller Sales

import SaleService from '@/db/sale';
import { Sale, Product } from '@/types/controller/Sale';
import Enterprise from '@/types/controller/Enterprise';

export default class SaleController {
  private service = new SaleService();

  async getAllSales(userID: string): Promise<Sale[]> {
    return this.service.getAllSales(userID);
  }

  async getSaleByEnt(enterpriseName: string, userID: string): Promise<Sale[]> {
    return this.service.getSaleByEnt(enterpriseName, userID);
  }

  async deleteSale(saleID: number): Promise<void> {
    return this.service.deleteSale(saleID);
  }

  async getAllEnt(): Promise<Enterprise[]> {
    return this.service.getAllEnt();
  }

  async getAllProd(): Promise<Product[]> {
    return this.service.getAllProd();
  }

  async getTopSales(userID: string): Promise<Sale[]> {
    return this.service.getTopSales(userID);
  }

  async updatePhaseSale(saleID: number, phaseID: number): Promise<void> {
    return this.service.updatePhaseSale(saleID, phaseID);
  }
}