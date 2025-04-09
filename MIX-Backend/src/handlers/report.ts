import { Request, Response, NextFunction } from 'express';
import ReportController from '../controllers/report';


class ReportHTTPHandler {
  private reportController: typeof ReportController;

    constructor() {
        this.reportController = ReportController;
    }

    getAllCierre = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id); 
        const products = await this.reportController.getAllCierre(id);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


    getAllCotizacion = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id); 
        const products = await this.reportController.getAllCotizacion(id);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


    getAllProspecto = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id); 
        const products = await this.reportController.getAllProspecto(id);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


    getTotalComissions = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id); 
        const products = await this.reportController.getTotalComissions(id);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };

}

export default new ReportHTTPHandler();