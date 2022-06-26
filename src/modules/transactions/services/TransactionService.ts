import { AccountRepository } from "../../accounts/repositories/AccountRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class TransactionService {
  constructor(
    private transactionRep: TransactionRepository,
    private accountRep: AccountRepository
  ) {}

  async makeTransfer(accountId: string, sourceBank: any, amount: number) {
    const transfer = await this.transactionRep.makeTransfer(
      accountId,
      sourceBank,
      amount
    );

    await this.accountRep.makeDeposit(accountId, amount);

    return transfer;
  }
}
