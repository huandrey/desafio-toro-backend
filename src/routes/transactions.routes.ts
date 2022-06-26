import { Router } from "express";

import { CreateTransactionController } from "../modules/transactions/useCases/CreateTransaction/CreateTransactionController";

const transactionRoutes = Router();

const createTransactionController = new CreateTransactionController();

transactionRoutes.post("/", createTransactionController.handle);

export { transactionRoutes };
