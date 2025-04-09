import { Request, Response, NextFunction } from 'express';
import SaleController from '../controllers/sale';

class SaleHTTPHandler {
  private saleController: typeof SaleController;

    constructor() {
        this.saleController = SaleController;
    }

    getAllSales = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id); 
        const resultado = await this.saleController.getAllSales(id);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    };    

    getSaleByFase= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idfase = Number(req.params.idfase);
        const iduser = Number(req.params.iduser);  
        const resultado = await this.saleController.getSaleByFase(idfase, iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 


    getSaleByEnt= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ent = String(req.params.ent);
        const iduser = Number(req.params.iduser);  
        const resultado = await this.saleController.getSaleByEnt(ent, iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 


}

export default new SaleHTTPHandler();

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