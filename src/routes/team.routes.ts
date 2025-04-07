import { Router } from "express";
import { getTeams } from "../controllers/team.controller";

const router = Router();
router.get("/teams", getTeams);

export default router;