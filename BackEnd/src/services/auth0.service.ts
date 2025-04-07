import axios from "axios";
import { auth0Config } from "../config/auth0";
import { Auth0User } from "../types/auth0";

export class Auth0Service {
  private domain = auth0Config.domain;
  private clientId = auth0Config.clientId;
  private clientSecret = auth0Config.clientSecret;
  private audience = auth0Config.audience;
  private managementAudience = auth0Config.audienceManagement;

  private async getAccessToken(audience1: string): Promise<string> {
    if (!audience1 || !audience1.startsWith("https://") || !audience1.includes("/api/v2")) {
      throw new Error(`Invalid audience passed to getAccessToken: "${audience1}"`);
    }
  
    const response = await axios.post(`https://${this.domain}/oauth/token`, {
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      audience: audience1,
    });
  
    console.log("scope:", response.data.scope);
    return response.data.access_token;
  }

  public async createUser(email: string, password: string): Promise<Auth0User> {
    const token = await this.getAccessToken(this.managementAudience);

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
    const {email_verified: boolean} = response.data;
    return {email_verified: boolean};
  }

  public async userExists(email: string): Promise<boolean> {
    const token = await this.getAccessToken(this.managementAudience);

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

  public async loginWithEmailPassword(email: string, password: string) {
    const response = await axios.post(`https://${this.domain}/oauth/token`, {
      grant_type: "password",
      username: email,
      password,
      audience: this.audience,
      client_id: auth0Config.clientIdFront,
      client_secret: auth0Config.clientSecretFront,
      scope: "openid profile email",
      connection: "Username-Password-Authentication"
    });

    return response.data; // access_token, id_token, etc.
  }
  public async getUserBySub(sub: string): Promise<{ email: string }> {
    const token = await this.getAccessToken(this.managementAudience);
  
    const response = await axios.get(
      `https://${this.domain}/api/v2/users/${sub}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { email: response.data.email };
  }
}