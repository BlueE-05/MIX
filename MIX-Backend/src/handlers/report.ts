import { Request, Response, NextFunction } from 'express';
import ReportController from '../controllers/report';
//Importar IDUSer
import { UserEmail } from '../getIDUser';


class ReportHTTPHandler {
  private reportController: typeof ReportController;

    constructor() {
        this.reportController = ReportController;
    }

    getAllCierre = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser=UserEmail;
        const products = await this.reportController.getAllCierre(iduser);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


    getTeamPos= async (req: Request, res: Response, next: NextFunction) => {
      try {
        const iduser=UserEmail;
        const resultado = await this.reportController.getTemPos(iduser);
        res.json(resultado);
      } catch (error) {
        next(error);
      }
    }; 

    


    getAllActive = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const IDUser = UserEmail;
        const products = await this.reportController.getAllActive(IDUser);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


      getAllCancelled = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = UserEmail
        const products = await this.reportController.getAllCancelled(id);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };


    getTotalComissions = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const IDUser= UserEmail;
        const products = await this.reportController.getTotalComissions(IDUser);
        res.json(products);
      } catch (error) {
        next(error);
      }
    };

    

    getAward = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const IDEmail = UserEmail;
        const awards = await this.reportController.getAward(IDEmail);
        res.json(awards);
      } catch (error) {
        next(error);
      }
    }

}

export default new ReportHTTPHandler();