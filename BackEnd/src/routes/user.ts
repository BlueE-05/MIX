import { Router } from "express";
import { Auth0Service } from "../handlers/auth0";
import { UserDbService } from "../db/user";
import { UserController } from "../controllers/user";
import { pool } from "../db/index";

const router = Router();

pool.then((db) => {
  const auth0 = new Auth0Service();
  const userDb = new UserDbService(db);
  const controller = new UserController(auth0, userDb);

  router.post("/signup", controller.signup.bind(controller));
});

export default router;