import { Request, Response, NextFunction } from 'express';
import NewSaleController from '../controllers/newsale';
//Importar IDUSer
import { UserEmail } from '../getIDUser';

//ana.gomez@empresa.com
class NewSaleHTTPHandler {
  private newsaleController: typeof NewSaleController;

    constructor() {
        this.newsaleController = NewSaleController;
    }

    //LISTO
    getAllContactByUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = UserEmail;
        const resultado = await this.newsaleController.getAllContactByUser(id);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    };

    //LISTO
    getPrice = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idprod = String(req.params.idprod); 
        const resultado = await this.newsaleController.getPrice(idprod);
        res.json(resultado);
      } catch (error) {
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

    getAllProd= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const resultado = await this.newsaleController.getAllProd();
        res.json(resultado);
      } catch (error) {
      next(error);
      }
    };

    createSale= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser=UserEmail;
        await this.newsaleController.createSale(iduser, req.body);
        res.json({ message: 'Contact created successfully' });
      } catch (error) {
      next(error);
      }
    };

    createSaleONE= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser=UserEmail;
        await this.newsaleController.createSaleONE(iduser, req.body);
        res.json({ message: 'Contact created successfully' });
      } catch (error) {
      next(error);
      }
    };
    /*
    createSaleMULT= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser=UserEmail;
        await this.newsaleController.createSaleONE(iduser, req.body);
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