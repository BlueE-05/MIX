/*import { Request, Response, NextFunction } from 'express';

import SaleController from '../controllers/sale';

export class SaleHttpHandler {
  private saleController: typeof SaleController;

    constructor() {
        this.saleController = SaleController;
    }
 
  async getSaleByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const total = await this.saleController.getSaleByID(Number(req.params.id));
      res.json(total);
    } catch (error) {
      next(error);
    }
  }

  async getSaleByPhase(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const total = await this.saleController.getSaleByPhase(Number(req.params.id));
      res.json(total);
    } catch (error) {
      next(error);
    }
  }



}


export const saleHttpHandler = new SaleHttpHandler();
*/