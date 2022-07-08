import { AccountRepository } from "@modules/accounts/repositories/AccountRepository";
import { TransactionRepository } from "@modules/transactions/repositories/TransactionRepository";

import { AppError } from "@shared/errors/AppError";

import {
  badRequest,
  getSuccessRequest,
} from "../../../clients/helpers/http-helper";

export class ListTransactionUseCase {
  constructor(
    private accountRep: AccountRepository,
    private transactionRep: TransactionRepository
  ) {}

  async execute(id: string) {
    const account = await this.accountRep.findAccountByUserId(id);

    if (!account) {
      throw new AppError("User not has account!");
    }

    const transactions = await this.transactionRep.getAllTransactionsOfUser(
      account.id
    );

    return getSuccessRequest("Success list transactions", {
      transactions,
    });
  }
}
