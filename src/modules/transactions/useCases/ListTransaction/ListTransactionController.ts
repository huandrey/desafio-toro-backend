import { Request, Response } from "express";

import { AccountRepository } from "../../../accounts/repositories/AccountRepository";
import { TransactionRepository } from "../../repositories/TransactionRepository";
import { TransactionService } from "../../services/TransactionService";
import { ListTransactionUseCase } from "./ListTransactionUseCase";

const accountRep = new AccountRepository();
const transactionRep = new TransactionRepository();
const transactionService = new TransactionService(transactionRep, accountRep);

export class ListTransactionController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const listTransactionUseCase = new ListTransactionUseCase(
      transactionService
    );

    const res = await listTransactionUseCase.execute(id);

    return response.status(res.statusCode).json(res);
  }
}
