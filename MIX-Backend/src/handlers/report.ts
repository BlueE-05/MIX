import { Request, Response, NextFunction } from 'express';
import ReportController from '../controllers/report';


class ReportHTTPHandler {
  private reportController: typeof ReportController;

    constructor() {
        this.reportController = ReportController;
    }

    getAllCierre = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser='ana.gomez@empresa.com'
        const products = await this.reportController.getAllCierre(iduser);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


    getTeamPos= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser='ana.gomez@empresa.com'
        const resultado = await this.reportController.getTemPos(iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 

    


    getAllActive = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const IDUser = String(req.params.IDUser); 
        const products = await this.reportController.getAllActive(IDUser);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


      getAllCancelled = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = String(req.params.id); 
        const products = await this.reportController.getAllCancelled(id);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


    getTotalComissions = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const IDUser= String(req.params.IDUser); 
        const products = await this.reportController.getTotalComissions(IDUser);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };

    

    getAward = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const IDEmail = String(req.params.IDEmail); //harcoded para pruebas
        const awards = await this.reportController.getAward(IDEmail);
        res.json(awards);
      } catch (error) {
        next(error);
      }
    }

}

export default new ReportHTTPHandler();