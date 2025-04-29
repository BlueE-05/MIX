import { Request, Response, NextFunction } from 'express';
import SaleController from '@/controllers/sale';
import { AuthRequest } from '@/types/controller/auth0';
import { Auth0Service } from '@/services/auth0.service';

export default class SaleHTTPHandler {
  private saleController: SaleController;
  private auth0Service: Auth0Service;

  constructor() {
    this.saleController = new SaleController;
    this.auth0Service = new Auth0Service();
    this.getAllSales = this.getAllSales.bind(this);
    this.getSaleByEnt = this.getSaleByEnt.bind(this);
    this.getAllEnt = this.getAllEnt.bind(this);
    this.getAllProd = this.getAllProd.bind(this);
    this.getTopSales = this.getTopSales.bind(this);
    this.updatePhaseSale = this.updatePhaseSale.bind(this);
    this.deleteSale = this.deleteSale.bind(this);
  }

  public async getAllSales(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) {
        res.status(400).json({ error: "Token without sub" });
        return;
      }
      const { email } = await this.auth0Service.getUserBySub(sub);
      const sales = await this.saleController.getAllSales(email);
      res.json(sales);
    } catch (error) {
      next(error);
    }
  }

  public async getSaleByEnt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) {
        res.status(400).json({ error: "Token without sub" });
        return;
      }
      const { email } = await this.auth0Service.getUserBySub(sub);
      const enterpriseName = req.params.ent;
      const sales = await this.saleController.getSaleByEnt(enterpriseName, email);
      res.json(sales);
    } catch (error) {
      next(error);
    }
  }

  public async getAllEnt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const enterprises = await this.saleController.getAllEnt();
      res.json(enterprises);
    } catch (error) {
      next(error);
    }
  }

  public async getAllProd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.saleController.getAllProd();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getTopSales(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) {
        res.status(400).json({ error: "Token without sub" });
        return;
      }
      const { email } = await this.auth0Service.getUserBySub(sub);
      const topSales = await this.saleController.getTopSales(email);
      res.json(topSales);
    } catch (error) {
      next(error);
    }
  }

  public async updatePhaseSale(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const saleID = Number(req.params.idsale);
      const phaseID = Number(req.params.idphase);
      await this.saleController.updatePhaseSale(saleID, phaseID);
      res.json({ message: 'Sale phase updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  public async deleteSale(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const saleID = Number(req.params.idsale);
      await this.saleController.deleteSale(saleID);
      res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}