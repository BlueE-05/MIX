import { Request, Response } from "express";
import { Auth0Service } from "../services/auth0.service";
import { UserDTO } from "../types/user";
import { UserDbService } from "../db/user";
import { AuthRequest } from "../types/auth0";
import { setAuthCookies, clearAuthCookies } from "../utils/cookieManager";

export class UserController {
  constructor(
    private auth0Service: Auth0Service,
    private userDbService: UserDbService
  ) {}

  public async signup(req: Request, res: Response): Promise<Response> {
    const userData: UserDTO = req.body;
    const { Email, Password } = userData;

    if (!Email || !Password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const auth0User = await this.auth0Service.createUser(Email, Password);
      await this.auth0Service.sendVerificationEmail(auth0User.user_id);

      await this.userDbService.createUser({
        ...userData,
        email_verified: auth0User.email_verified,
      });

      const tokens = await this.auth0Service.loginWithEmailPassword(Email, Password);
      setAuthCookies(res, tokens);

      return res.status(201).json({ message: "User created and logged in" });
    } catch (error: any) {
      console.error("Error creating Auth0 user:", error.response?.data || error.message);
      return res.status(500).json({ error: "Error creating user" });
    }
  }

  public async getProfile(req: AuthRequest, res: Response): Promise<Response> {
    const sub = req.auth?.sub;
    if (!sub) return res.status(400).json({ error: "Token without sub" });

    try {
      const { email, email_verified } = await this.auth0Service.getUserBySub(sub);

      await this.userDbService.updateEmailVerified(email, email_verified);

      const user = await this.userDbService.getUserByEmail(email);
      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json({
        ...user, 
        email_verified,
      });
    } catch (err: any) {
      console.error("Error in getProfile():", err.message);
      return res.status(500).json({ error: "Intern error" });
    }
  }

  public async resendVerificationEmail(req: AuthRequest, res: Response): Promise<Response> {
    const sub = req.auth?.sub;
    if (!sub) return res.status(400).json({ error: "Token without sub" });
  
    try {
      const { email } = await this.auth0Service.getUserBySub(sub);
  
      const lastSent = await this.userDbService.getLastVerificationSent(email);
      const now = new Date();
      const cooldownMs = 10 * 60 * 1000;
  
      if (lastSent) {
        const elapsed = now.getTime() - new Date(lastSent).getTime();
        const remainingMs = Math.max(0, cooldownMs - elapsed);
  
        if (remainingMs > 0) {
          const secondsLeft = Math.ceil(remainingMs / 1000);
          return res.status(429).json({
            secondsLeft
          });
        }
      }
  
      await this.auth0Service.sendVerificationEmail(sub);
      await this.userDbService.updateLastVerificationSent(email);
  
      return res.status(200).json({ message: "Verification email resent", secondsLeft: Math.ceil(cooldownMs / 1000) });
    } catch (err: any) {
      console.error("Error resending verification email:", err.message);
      return res.status(500).json({ error: "Failed to resend verification email" });
    }
  }
  
  
  public logout(req: Request, res: Response): void {
    clearAuthCookies(res);
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  }

  public async getEmailStatus(req: AuthRequest, res: Response): Promise<Response> {
    const sub = req.auth?.sub;
    if (!sub) return res.status(400).json({ error: "Token without sub" });
  
    try {
      const { email, email_verified } = await this.auth0Service.getUserBySub(sub);
      return res.status(200).json({ email, email_verified });
    } catch (err: any) {
      console.error("Error fetching email status:", err.message);
      return res.status(500).json({ error: "Failed to get email status" });
    }
  }
  
}
