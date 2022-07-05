import { Transactions } from "@prisma/client";

import { prisma } from "../../../database";
import { SourceBankDTO } from "../DTO/SourceBankDTO";
import { ITransactionRepository } from "./ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {
  async getAllTransactionsOfUser(
    idAccount: string
  ): Promise<Transactions[] | null> {
    const transactions = await prisma.transactions.findMany({
      where: {
        target_account_id: idAccount,
      },
    });

    return transactions;
  }

  async findTransactionById(
    transactionId: string
  ): Promise<Transactions | null> {
    const transaction = await prisma.transactions.findUnique({
      where: {
        id: transactionId,
      },
    });

    return transaction;
  }

  async makeTransfer(
    targetAccountId: string,
    sourceBank: SourceBankDTO,
    amount: number
  ): Promise<Transactions | null> {
    const transaction = await prisma.transactions.create({
      data: {
        target_account_id: targetAccountId,
        source_bank: sourceBank.bank,
        source_cpf: sourceBank.cpf,
        source_branch: sourceBank.branch,
        amount,
      },
    });

    return transaction;
  }
}
