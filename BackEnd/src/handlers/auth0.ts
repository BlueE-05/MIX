import axios from "axios";
import { auth0Config } from "../config/auth0";
import { Auth0User } from "../types/auth0";

export class Auth0Service {
  private domain = auth0Config.domain;
  private clientId = auth0Config.clientId;
  private clientSecret = auth0Config.clientSecret;
  private audience = `https://${auth0Config.domain}/api/v2/`;

  private async getAccessToken(): Promise<string> {
    const response = await axios.post(`https://${this.domain}/oauth/token`, {
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      audience: this.audience,
    });

    return response.data.access_token;
  }

  public async createUser(email: string, password: string): Promise<Auth0User> {
    const token = await this.getAccessToken();

    const response = await axios.post(
      `https://${this.domain}/api/v2/users`,
      {
        email,
        password,
        connection: "Username-Password-Authentication",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { user_id, email: userEmail, email_verified} = response.data;
    return { user_id, email: userEmail, email_verified};
  }

  public async userExists(email: string): Promise<boolean> {
    const token = await this.getAccessToken();

    const response = await axios.get(
      `https://${this.domain}/api/v2/users-by-email`,
      {
        params: { email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.length > 0;
  }
}