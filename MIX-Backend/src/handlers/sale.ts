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

    getKNnumHandler= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idsale = Number(req.params.idsale);
        const iduser = Number(req.params.iduser);  
        const resultado = await this.saleController.getKNnum(idsale, iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 

    /*
    async getKNnumHandler(idsale: number, iduser: number) {
      return await this.saleController.getKNnum(idsale, iduser);
    }
      */

    

    
    /*
    getKBNum= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idsale = Number(req.params.idsale);
        const iduser = Number(req.params.iduser);  
        const resultado = await this.saleController.getKBNum(idsale, iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    };  */
    



}

export default new SaleHTTPHandler();

