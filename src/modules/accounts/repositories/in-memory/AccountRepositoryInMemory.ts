import { Accounts } from "@prisma/client";
import { Account } from "modules/accounts/entities/Account";

import { IAccountRepository } from "../IAccountRepository";

export class AccountRepositoryInMemory implements IAccountRepository {
  accounts: Account[] = [];

  async createAccount(userId: string): Promise<Accounts | null> {
    const account = new Account();
    const agencyNumber = "0001";
    const accountNumber = this.generateAccount();
    const balance = 0;

    Object.assign(account, {
      fk_id_user: userId,
      agency_number: agencyNumber,
      account_number: accountNumber,
      balance,
    });

    this.accounts.push(account);

    return account;
  }

  generateNumber() {
    const max = 9;
    const min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateAccount() {
    const aux = [0, 0, 0, 0, 0, 0];
    let accountNumber = "";

    aux.forEach(() => {
      accountNumber += this.generateNumber();
    });

    return accountNumber;
  }

  async findAccountByUserId(userId: string): Promise<Accounts | null> {
    const account = this.accounts.find(
      (account) => account.fk_id_user === userId
    );

    if (!account) return null;

    return account;
  }

  async makeDeposit(
    accountId: string,
    amount: number
  ): Promise<Accounts | null> {
    const account = this.accounts.find((account) => account.id === accountId);

    if (!account) return null;

    account.balance += amount;

    return account;
  }
}
