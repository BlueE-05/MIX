import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { auth0Config } from "../config/auth0";

export const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Config.domain}/.well-known/jwks.json`,
  }),
  audience: [
    `https://${auth0Config.domain}/api/v2/`,
    `https://${auth0Config.domain}/userinfo`,
  ],
  issuer: `https://${auth0Config.domain}/`,
  algorithms: ["RS256"],
});