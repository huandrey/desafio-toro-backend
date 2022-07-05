import { prisma } from "../../../database";

export class TransactionRepository {
  async getAllTransactionsOfUser(idAccount: string) {
    const transactions = await prisma.transactions.findMany({
      where: {
        target_account_id: idAccount,
      },
    });

    return transactions;
  }

  async findTransactionById(transactionId: string) {
    const transaction = await prisma.transactions.findUnique({
      where: {
        id: transactionId,
      },
    });

    return transaction;
  }

  async makeTransfer(targetAccountId: any, sourceBank: any, amount: number) {
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
