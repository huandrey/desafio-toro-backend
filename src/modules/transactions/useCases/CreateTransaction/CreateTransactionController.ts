import { Request, Response } from "express";

import { AccountRepository } from "../../../accounts/repositories/AccountRepository";
import { AccountService } from "../../../accounts/services/AccountService";
import { UserRepository } from "../../../clients/repositories/UserRepository";
import { TransactionRepository } from "../../repositories/TransactionRepository";
import { TransactionService } from "../../services/TransactionService";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

const userRep = new UserRepository();
const accountRep = new AccountRepository();
const accountServive = new AccountService(accountRep, userRep);
const transactionRep = new TransactionRepository();
const transactionService = new TransactionService(transactionRep, accountRep);

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { event, origin, target, amount } = request.body;

    const createTransactionUseCase = new CreateTransactionUseCase(
      transactionService,
      accountServive
    );

    const res = await createTransactionUseCase.execute({
      event,
      origin,
      target,
      amount,
    });

    return response.status(res.statusCode).json(res);
  }
}
