import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { auth0Config } from "../config/auth0";
import { setAuthCookies } from "@/utils/cookieManager";
import { Request, Response, NextFunction } from 'express';
import axios from "axios";
import { AuthRequest } from "@/types/controller/auth0";

export const jwtCheckFromCookie = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Config.domain}/.well-known/jwks.json`,
  }),
  algorithms: ["RS256"],
  audience: [
    `https://${auth0Config.domain}/api/v2/`,
    `https://${auth0Config.domain}/userinfo`,
  ],
  issuer: `https://${auth0Config.domain}/`,
  credentialsRequired: false,
  getToken: (req) => {
    return req.cookies?.access_token || null;
  },
});


export const tryRefreshTokenMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.auth) return next();

  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) return next();

  try {
    const response = await axios.post(`https://${auth0Config.domain}/oauth/token`, {
      grant_type: "refresh_token",
      client_id: auth0Config.clientIdFront,
      client_secret: auth0Config.clientSecretFront,
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    setAuthCookies(res, { 
      access_token, 
      refresh_token: newRefreshToken || refreshToken 
    });

    return next();
  } catch (error: any) {
    console.error("Failed to refresh token:", error.response?.data || error.message);
    return next();
  }
}
