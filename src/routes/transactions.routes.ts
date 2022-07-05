import { Router } from "express";

import { CreateTransactionController } from "../modules/transactions/useCases/CreateTransaction/CreateTransactionController";
import { ListTransactionController } from "../modules/transactions/useCases/ListTransaction/ListTransactionController";
import { ensureAuthenticated } from "../shared/http/middlewares/ensuredAutheticated";

const transactionRoutes = Router();

const createTransactionController = new CreateTransactionController();
const listTransactionController = new ListTransactionController();

transactionRoutes.post(
  "/",
  ensureAuthenticated,
  createTransactionController.handle
);

transactionRoutes.get(
  "/",
  ensureAuthenticated,
  listTransactionController.handle
);

export { transactionRoutes };
