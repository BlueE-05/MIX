import { Request, Response, NextFunction } from 'express';
import ReportController from '../controllers/report';

export class ReportHttpHandler {
  private reportController: typeof ReportController;

    constructor() {
        this.reportController = ReportController;
    }
 
  async getAllCierre(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const total = await ReportController.getAllCierre();
      res.json(total);
    } catch (error) {
      next(error);
    }
  }

  async getAllProspecto(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const total = await ReportController.getAllProspecto();
      res.json(total);
    } catch (error) {
      next(error);
    }
  }

  async getAllCotizacion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const total = await ReportController.getAllCotizacion();
      res.json(total);
    } catch (error) {
      next(error);
    }
  }

  async getAllComissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const total = await ReportController.getTotalComissions
      res.json(total);
    } catch (error) {
      next(error);
    }
  }

}


export const reportHttpHandler = new ReportHttpHandler();
