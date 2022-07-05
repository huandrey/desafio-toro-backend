import { Transactions } from "@prisma/client";
import { Transaction } from "modules/transactions/entities/Transaction";

import { SourceBankDTO } from "../../DTO/SourceBankDTO";
import { ITransactionRepository } from "../ITransactionRepository";

export class TransactionRepositoryInMemory implements ITransactionRepository {
  transactions: Transactions[] = [];

  async getAllTransactionsOfUser(
    idAccount: string
  ): Promise<Transactions[] | null> {
    return this.transactions.filter(
      (transaction) => transaction.id === idAccount
    );
  }

  async findTransactionById(
    transactionId: string
  ): Promise<Transactions | null> {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === transactionId
    );

    if (!transaction) return null;

    return transaction;
  }

  async makeTransfer(
    targetAccountId: string,
    sourceBank: SourceBankDTO,
    amount: number
  ): Promise<Transactions | null> {
    const transaction = new Transaction();

    Object.assign(transaction, {
      target_account_id: targetAccountId,
      source_bank: sourceBank.bank,
      source_cpf: sourceBank.cpf,
      source_branch: sourceBank.branch,
      amount,
    });

    return transaction;
  }
}
