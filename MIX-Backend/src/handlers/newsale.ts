import { Request, Response, NextFunction } from 'express';
import NewSaleController from '@/controllers/newsale';
import { AuthRequest } from '@/types/controller/auth0';
import { Auth0Service } from '@/services/auth0.service';

export default class NewSaleHTTPHandler {
  private newsaleController: NewSaleController;
  private auth0Service: Auth0Service;

  constructor() {
    this.newsaleController = new NewSaleController();
    this.auth0Service = new Auth0Service();
    this.getAllContactByUser = this.getAllContactByUser.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.getPhases = this.getPhases.bind(this);
    this.getAllProd = this.getAllProd.bind(this);
    this.createSaleMULT = this.createSaleMULT.bind(this);
  }

  public async getAllContactByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const resultado = await this.newsaleController.getAllContactByUser(email);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  public async getPrice(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idprod = String(req.params.idprod);
      const resultado = await this.newsaleController.getPrice(idprod);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  public async getPhases(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resultado = await this.newsaleController.getPhases();
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  public async getAllProd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resultado = await this.newsaleController.getAllProd();
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }


  public async createSaleMULT(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const { idcont, idphase, products } = req.body;

      if (!email || !idcont || !idphase || !products || !Array.isArray(products)) {
        res.status(400).json({ error: 'Incomplete or invalid data' });
        return;
      }
      if (products.some(p => !p.idprod || !p.quant)) {
        res.status(400).json({ error: 'Invalid product data' });
        return;
      }

      const result = await this.newsaleController.createSaleMULT(email, { idcont, idphase, products });

      res.status(201).json({
        message: 'Sale created successfully',
        saleId: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
