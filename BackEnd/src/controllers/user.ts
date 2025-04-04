import { Request, Response } from "express";
import { Auth0Service } from "../handlers/auth0";
import { UserDTO } from "../types/user";
import { UserDbService } from "../db/user";

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
        user_id: auth0User.user_id,
        email_verified: auth0User.email_verified
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
      console.error("Error creating Auth0 user:", error.response?.data || error.message);
      res.status(500).json({ error: "Error creating user" });
    }
  }
}
