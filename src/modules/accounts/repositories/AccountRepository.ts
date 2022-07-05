import { Accounts } from "@prisma/client";

import { prisma } from "../../../database";
import { IAccountRepository } from "./IAccountRepository";

export class AccountRepository implements IAccountRepository {
  async createAccount(userId: string): Promise<Accounts | null> {
    const agencyNumber = "0001";
    const accountNumber = this.generateAccount();
    const balance = 0;

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

  generateNumber(): number {
    const max = 9;
    const min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateAccount(): string {
    const aux = [0, 0, 0, 0, 0, 0];
    let accountNumber = "";

    aux.forEach(() => {
      accountNumber += this.generateNumber();
    });

    return accountNumber;
  }

  async findAccountByUserId(userId: string): Promise<Accounts | null> {
    const account = await prisma.accounts.findUnique({
      where: {
        fk_id_user: userId,
      },
    });

    return account;
  }

  async makeDeposit(
    accountId: string,
    amount: number
  ): Promise<Accounts | null> {
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
