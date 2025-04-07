import { Request, Response } from "express";
import { Auth0Service } from "../services/auth0.service";
import jwt from "jsonwebtoken";

export class AuthController {
  private auth0Service: Auth0Service;

  constructor(auth0Service: Auth0Service) {
    this.auth0Service = auth0Service;
  }

  public async loginWithEmailPassword(req: Request, res: Response) {
    const { email, password } = req.body;
  
    console.log("Email recibido:", email);
    console.log("Password recibido:", password);

    if (!email || !password)
      return res.status(400).json({ message: "Email y password son requeridos" });
  
    try {
      const { access_token, id_token } = await this.auth0Service.loginWithEmailPassword(email, password);
  
      const decoded = jwt.decode(access_token, { complete: true });
      console.log("Decoded access_token payload:", decoded?.payload);
  
      return res.status(200).json({ message: "Login correcto", access_token, id_token });
    } catch (error: any) {
      console.error("Error login:", error.response?.data || error.message);
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
  }
}