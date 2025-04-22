import { Request, Response, NextFunction } from 'express';
import NewSaleController from '../controllers/newsale';

import { poolPromise, sql } from 'database';

class NewSaleHTTPHandler {
  private newsaleController: typeof NewSaleController;

    constructor() {
        this.newsaleController = NewSaleController;
    }

    getAllContactByUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id); 
        const resultado = await this.newsaleController.getAllContactByUser(id);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    };

  
    getInfoContacto = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const id = Number(req.params.id);
          const cont = Number(req.params.cont);
          const resultado = await this.newsaleController.getInfoContacto(id, cont);
          res.json(resultado);
          
      } catch (error) {
          console.error('Error en getInfoContacto handler:', error);
          next(error);
      }
    };


    getPhases= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const resultado = await this.newsaleController.getPhases();
        res.json(resultado);
      } catch (error) {
      next(error);
      }
    };

  



    //iduser: number, idcont: number, startdate: string, enddate: string, idphase: number
    /*
    createSale= async (req: Request, res: Response, next: NextFunction) => {
      try {
        
        await this.newsaleController.createSale(req.body);
        res.json({ message: 'Contact created successfully' });
      } catch (error) {
      next(error);
      }
    };
    */
    
    
  
    



}

export default new NewSaleHTTPHandler();



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