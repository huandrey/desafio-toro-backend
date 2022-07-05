import { Transactions } from "@prisma/client";

import { SourceBankDTO } from "../DTO/SourceBankDTO";

export interface ITransactionRepository {
  getAllTransactionsOfUser(idAccount: string): Promise<Transactions[] | null>;
  findTransactionById(transactionId: string): Promise<Transactions | null>;
  makeTransfer(
    targetAccountId: string,
    sourceBank: SourceBankDTO,
    amount: number
  ): Promise<Transactions | null>;
}
