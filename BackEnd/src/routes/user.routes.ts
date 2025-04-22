import { Router } from "express";
import { jwtCheckFromCookie } from "../middleware/auth0";
import { UserHttpHandler } from "../handlers/user.handler";

const router = Router();
const handler = new UserHttpHandler();

router.post("/signup", handler.signup);
router.get("/profile", jwtCheckFromCookie, handler.getProfile);
router.post("/logout", handler.logout);
router.post("/resend-verification", jwtCheckFromCookie, handler.resendVerificationEmail.bind(handler));
  

export default router;