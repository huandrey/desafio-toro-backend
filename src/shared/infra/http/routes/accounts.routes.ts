import { CreateAccountController } from "@modules/accounts/useCases/CreateAccount/CreateAccountController";
import { GetAccountController } from "@modules/accounts/useCases/GetAccount/GetAccountController";
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensuredAutheticated";

const accountRoutes = Router();

const createAccountController = new CreateAccountController();
const getAccountController = new GetAccountController();

accountRoutes.post(
  "/:userId",
  ensureAuthenticated,
  createAccountController.handle
);

accountRoutes.get("/:userId", ensureAuthenticated, getAccountController.handle);

export { accountRoutes };
