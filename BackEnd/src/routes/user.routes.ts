import { Router } from "express";
import { jwtCheck } from "../middleware/auth0";
import { UserHttpHandler } from "../handlers/user.handler";

const router = Router();
const handler = new UserHttpHandler();

router.post("/signup", handler.signup);
router.get("/profile", jwtCheck, handler.getProfile);

export default router;