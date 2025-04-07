import { Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/auth0.controller";
import { auth0Service } from "../services";

const controller = new AuthController(auth0Service);


export class Auth0HttpHandler {
  public async loginWithEmailPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await controller.loginWithEmailPassword(req, res);
    } catch (error) {
      next(error);
    }
  }
}