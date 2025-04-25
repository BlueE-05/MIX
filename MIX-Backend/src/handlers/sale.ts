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
        const id = String(req.params.id); 
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

    getKNnum= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idsale = Number(req.params.idsale);
        const iduser = Number(req.params.iduser);  
        const resultado = await this.saleController.getKNnum(idsale, iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 


    getKNinfo= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idsale = Number(req.params.idsale);
        const iduser = Number(req.params.iduser);  
        const resultado = await this.saleController.getKNinfo(idsale, iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 

    getFormInfo= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idsale = Number(req.params.idsale);
        const iduser = Number(req.params.iduser);  
        const resultado = await this.saleController.getFormInfo(idsale, iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 

    getFormNum= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idsale = Number(req.params.idsale);
        const iduser = Number(req.params.iduser);  
        const resultado = await this.saleController.getFormNum(idsale, iduser);
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


    deleteSale = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      try {
          const idsale = Number(req.params.idsale);
          const iduser = Number(req.params.iduser);

          if (isNaN(idsale) || isNaN(iduser)) {
              return res.status(400).json({
                  success: false,
                  message: 'IDs deben ser números válidos'
              });
          }

          const wasDeleted = await this.saleController.deleteSale(idsale, iduser);

          if (wasDeleted) {
              return res.status(200).json({
                  success: true,
                  message: 'Venta eliminada exitosamente'
              });
          } else {
              return res.status(404).json({
                  success: false,
                  message: 'Venta no encontrada o no pertenece al usuario'
              });
          }
      } catch (error) {
          next(error);
      }
  };

    
    



}

export default new SaleHTTPHandler();

