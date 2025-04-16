import { Request, Response } from "express";
import { Auth0Service } from "../services/auth0.service";
import { UserDTO } from "../types/user";
import { UserDbService } from "../db/user";
import { AuthRequest } from "../types/auth0";
import { setAuthCookies, clearAuthCookies } from "../utils/cookieManager";

export class UserController {
  private auth0Service: Auth0Service;
  private userDbService: UserDbService;
  
  constructor(auth0Service: Auth0Service, userDbService: UserDbService){
    this.auth0Service = auth0Service;
    this.userDbService = userDbService;
  }

  public async signup(req: Request, res: Response): Promise<void> {
    const userData: UserDTO = req.body;
    const { Email, Password } = userData;
  
    if (!Email || !Password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
  
    try {
      if (await this.auth0Service.userExists(Email)) {
        res.status(409).json({ error: "Email already exists in Auth0" });
        return;
      }
  
      const auth0User = await this.auth0Service.createUser(Email, Password);
  
      await this.userDbService.createUser({
        ...userData,
        email_verified: auth0User.email_verified
      });
  
      const tokens = await this.auth0Service.loginWithEmailPassword(Email, Password);
  
      setAuthCookies(res, tokens);
  
      res.status(201).json({ message: "User created and logged in" });
    } catch (error: any) {
      console.error("Error creating Auth0 user:", error.response?.data || error.message);
      res.status(500).json({ error: "Error creating user" });
    }
  }

  public async getProfile(req: AuthRequest, res: Response) {
    const sub = req.auth?.sub;
    console.log("sub from token:", sub);
  
    if (!sub) return res.status(400).json({ error: "Token without sub" });
  
    try {
      const { email } = await this.auth0Service.getUserBySub(sub);
      console.log("email from Auth0 Management API:", email);
  
      const user = await this.userDbService.getUserByEmail(email);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      return res.status(200).json(user);
    } catch (err: any) {
      console.error("Error in getProfile():", err.message);
      return res.status(500).json({ error: "Intern error" });
    }
  }
  
  public logout(req: Request, res: Response) {
    clearAuthCookies(res);
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  }
  
}
