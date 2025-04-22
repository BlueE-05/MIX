import { Request, Response, NextFunction } from "express";
import { userControllerPromise } from "../factories/controllerFactory";


export class UserHttpHandler {
  public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller = await userControllerPromise;
      await controller.signup(req, res);
    } catch (error) {
      next(error);
    }
  }

  public async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller = await userControllerPromise;
      await controller.getProfile(req as any, res);
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller = await userControllerPromise;
      controller.logout(req, res);
    } catch (error) {
      next(error);
    }
  }

  public async resendVerificationEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const controller = await userControllerPromise;
      await controller.resendVerificationEmail(req as any, res);
    } catch (error) {
      next(error);
    }
  }
}
