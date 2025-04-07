/*import { Request, Response, NextFunction } from 'express';
import NewSaleController from '../controllers/newsale';


export class NewSaleHttpHandler {
  private newsaleController: typeof NewSaleController;

    constructor() {
        this.newsaleController = NewSaleController;
    }
 
  async getcontactByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const total = await this.newsaleController.getContactoByID(Number(req.params.id));
      res.json(total);
    } catch (error) {
      next(error);
    }
  }


  async createNewSale(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { iduser, idcontact, startdate, enddate, idphase } = req.body;
      const total = await this.newsaleController.createNewSale(iduser, idcontact, new Date(startdate), new Date(enddate), idphase);
      res.json(total);
    } catch (error) {
      next(error);
    }
  }

  async getAllComissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const total = await this.newsaleController.getAllContacts();
      res.json(total);
    } catch (error) {
      next(error);
    }
  }

}


export const newsaleHttpHandler = new NewSaleHttpHandler();
*/