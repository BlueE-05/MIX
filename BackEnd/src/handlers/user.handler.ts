import { Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user.controller";
import { auth0Service } from "../services";
import { pool } from "../db";
import { UserDbService } from "../db/user";

const controllerPromise = pool.then(
  (db) => new UserController(auth0Service, new UserDbService(db))
);

export class UserHttpHandler {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const controller = await controllerPromise;
      await controller.signup(req, res);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const controller = await controllerPromise;
      await controller.getProfile(req as any, res);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const controller = await controllerPromise;
      controller.logout(req, res);
    } catch (error) {
      next(error);
    }
  }
  
}