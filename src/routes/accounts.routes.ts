import { Router } from "express";

import { CreateAccountController } from "../modules/accounts/useCases/CreateAccount/CreateAccountController";

const accountRoutes = Router();

const createAccountController = new CreateAccountController();

accountRoutes.post("/:userId", createAccountController.handle);

export { accountRoutes };
