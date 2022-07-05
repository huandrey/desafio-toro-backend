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

  async listTransactions(id: string) {
    const account = await this.accountRep.findAccountByUserId(id);
    console.log(`f -> ${JSON.stringify(account, null, 2)}`);
    if (account) {
      const transactions = await this.transactionRep.getAllTransactionsOfUser(
        account.id
      );
      return transactions;
    }
  }
}
