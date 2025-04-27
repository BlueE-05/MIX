import { Request, Response, NextFunction } from 'express';
import SaleController from '../controllers/sale';
//Importar IDUSer
import { UserEmail } from '../getIDUser';


class SaleHTTPHandler {
  private saleController: typeof SaleController;

    constructor() {
        this.saleController = SaleController;
    }

    getAllSales = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = UserEmail;
        const resultado = await this.saleController.getAllSales(id);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    };    


    getSaleByEnt= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ent = String(req.params.ent);
        const iduser = String(req.params.iduser);  
        const resultado = await this.saleController.getSaleByEnt(ent, iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 


    getAllEnt= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const resultado = await this.saleController.getAllEnt();
        res.json(resultado);
      } catch (error) {
      next(error);
      }
    };

    getAllProd= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const resultado = await this.saleController.getAllProd();
        res.json(resultado);
      } catch (error) {
      next(error);
      }
    };

    getTopSales= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser=UserEmail;
        const resultado = await this.saleController.getTopSales(iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 

    updatePhaseSale= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idsale=Number(req.params.idsale);
        const idphase=Number(req.params.idphase);
        const resultado = await this.saleController.updatePhaseSale(idsale, idphase);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 



  // En tu clase handler, cambia la declaración a arrow function:
  deleteSale = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idsale = Number(req.params.idsale);
      await this.saleController.deleteSale(idsale);
      res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

   
    
  
}

export default new SaleHTTPHandler();

