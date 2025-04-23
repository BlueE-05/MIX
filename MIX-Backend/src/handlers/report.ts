import { Request, Response, NextFunction } from 'express';
import ReportController from '../controllers/report';


class ReportHTTPHandler {
  private reportController: typeof ReportController;

    constructor() {
        this.reportController = ReportController;
    }

    getAllCierre = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = String(req.params.id); 
        const products = await this.reportController.getAllCierre(id);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


    getAllActive = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = String(req.params.id); 
        const products = await this.reportController.getAllActive(id);
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
        const id = String(req.params.id); 
        const products = await this.reportController.getTotalComissions(id);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };

    getAward = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const IDEmail = 'ana.gomez@empresa.com'; //harcoded para pruebas
        const awards = await this.reportController.getAward(IDEmail);
        res.json(awards);
      } catch (error) {
        next(error);
      }
    }

}

export default new ReportHTTPHandler();