import { prisma } from "../../../database";

export class AccountRepository {
  async createAccount({ userId, agencyNumber, accountNumber, balance }: any) {
    const account = await prisma.accounts.create({
      data: {
        fk_id_user: userId,
        agency_number: agencyNumber,
        account_number: accountNumber,
        balance,
      },
    });

    return account;
  }

  async findAccountByUserId(userId: string) {
    const account = await prisma.accounts.findUnique({
      where: {
        fk_id_user: userId,
      },
    });

    return account;
  }

  async makeDeposit(accountId: string, amount: number) {
    const deposit = await prisma.accounts.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return deposit;
  }
}
