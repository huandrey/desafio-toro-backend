import { CreateUserController } from "@modules/clients/useCases/CreateUser/CreateUserController";
import { RecoveryUserController } from "@modules/clients/useCases/RecoveryUser/RecoveryUseController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensuredAutheticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const recoveryUserController = new RecoveryUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.post(
  "/recovery-data",
  ensureAuthenticated,
  recoveryUserController.handle
);

export { userRoutes };
