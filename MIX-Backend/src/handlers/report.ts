import { Request, Response, NextFunction } from 'express';
import ReportController from '@/controllers/report';
import { AuthRequest } from '@/types/controller/auth0';
import { Auth0Service } from '@/services/auth0.service';

export default class ReportHTTPHandler {
  private reportController: ReportController;
  private auth0Service: Auth0Service;

  constructor() {
    this.reportController = new ReportController();
    this.auth0Service = new Auth0Service();
    this.getAllCierre = this.getAllCierre.bind(this);
    this.getTeamPos = this.getTeamPos.bind(this);
    this.getAllActive = this.getAllActive.bind(this);
    this.getAllCancelled = this.getAllCancelled.bind(this);
    this.getTotalComissions = this.getTotalComissions.bind(this);
    this.getAward = this.getAward.bind(this);
    this.getDailyClosedSalesByEmail = this.getDailyClosedSalesByEmail.bind(this);
    this.getProdInfo = this.getProdInfo.bind(this);
    this.getTotalSalesByTeam = this.getTotalSalesByTeam.bind(this);
    this.getTotalComissionByTeam = this.getTotalComissionByTeam.bind(this);
    this.getTotalSalesByMember = this.getTotalSalesByMember.bind(this);
    this.getSalesInfoByMember = this.getSalesInfoByMember.bind(this);
    this.getDaysCurrentMonth = this.getDaysCurrentMonth.bind(this);
    this.getEveryDayClosedByUser = this.getEveryDayClosedByUser.bind(this);
    this.getDailyClosedSalesByTeam = this.getDailyClosedSalesByTeam.bind(this);
    this.getDailyClosedSalesByMember = this.getDailyClosedSalesByMember.bind(this);
    this.getSalesInfoMemberByEmail = this.getSalesInfoMemberByEmail.bind(this);
    this.getClosedDayUserByEmail = this.getClosedDayUserByEmail.bind(this);
  }

  public async getAllCierre(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getAllCierre(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getTeamPos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const resultado = await this.reportController.getTemPos(email);
      res.json(resultado);
    } catch (error) {
      next(error);
    }
  }

  public async getAllActive(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getAllActive(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getAllCancelled(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getAllCancelled(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getTotalComissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getTotalComissions(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getAward(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const awards = await this.reportController.getAward(email);
      res.json(awards);
    } catch (error) {
      next(error);
    }
  }

  public async getProdInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idprod = Number(req.params.idprod);
      const awards = await this.reportController.getProdInfo(idprod);
      res.json(awards);
    } catch (error) {
      next(error);
    }
  }

  public async getTotalSalesByTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getTotalSalesByTeam(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getTotalComissionByTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getTotalComissionByTeam(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getTotalSalesByMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getTotalSalesByMember(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getSalesInfoByMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getSalesInfoByMember(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getDaysCurrentMonth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const awards = await this.reportController.getDaysCurrentMonth();
      res.json(awards);
    } catch (error) {
      next(error);
    }
  }

  public async getEveryDayClosedByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getEveryDayClosedByUser(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getDailyClosedSalesByTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sub = (req as AuthRequest).auth?.sub;
      if (!sub) throw new Error('Token without sub');
      const { email } = await this.auth0Service.getUserBySub(sub);
      const products = await this.reportController.getDailyClosedSalesByTeam(email);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getDailyClosedSalesByMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const email_user = req.body.email;
      const products = await this.reportController.getEveryDayClosedByUser(email_user);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  public async getSalesInfoMemberByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) throw new Error('Email requerido');
      const info = await this.reportController.getSalesInfoByEmail(email);
      res.json(info);
    } catch (error) {
      next(error);
    }
  }

  public async getClosedDayUserByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) throw new Error('Email requerido');
  
      const data = await this.reportController.getDailyClosedSalesByEmail(email);
      res.json(data);
    } catch (error) {
      next(error);
    }
  } 

  public async getDailyClosedSalesByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      if (!email) throw new Error('Email requerido');
      const data = await this.reportController.getEveryDayClosedByUser(email);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  
   
}