import { Router } from "express";
import { jwtCheckFromCookie, tryRefreshTokenMiddleware} from "@/middleware/auth0";
import { UserHttpHandler } from "@/handlers/user.handler";

const router = Router();
const handler = new UserHttpHandler();

router.post("/signup", handler.signup);
router.get("/profile", jwtCheckFromCookie, tryRefreshTokenMiddleware, handler.getProfile);
router.get("/session", jwtCheckFromCookie, tryRefreshTokenMiddleware, handler.sessionStatus.bind(handler));
router.post("/logout", handler.logout);
router.get("/email-status", jwtCheckFromCookie, tryRefreshTokenMiddleware, handler.getEmailStatus.bind(handler));
router.post("/resend-verification", jwtCheckFromCookie, tryRefreshTokenMiddleware, handler.resendVerificationEmail.bind(handler));
router.post("/forgot-password", handler.forgotPassword);
router.post("/upload-profile-pic", jwtCheckFromCookie, tryRefreshTokenMiddleware, handler.uploadProfilePicture);

export default router;