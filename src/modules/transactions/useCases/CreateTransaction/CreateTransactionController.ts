import { Request, Response } from "express";

import { AccountRepository } from "../../../accounts/repositories/AccountRepository";
import { UserRepository } from "../../../clients/repositories/UserRepository";
import { TransactionRepository } from "../../repositories/TransactionRepository";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

const userRep = new UserRepository();
const accountRep = new AccountRepository();
const transactionRep = new TransactionRepository();

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { event, origin, target, amount } = request.body;

    const createTransactionUseCase = new CreateTransactionUseCase(
      transactionRep,
      userRep,
      accountRep
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
