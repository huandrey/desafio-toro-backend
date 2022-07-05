import { Accounts } from "@prisma/client";

export interface IAccountRepository {
  createAccount(userId: string): Promise<Accounts | null>;
  findAccountByUserId(userId: string): Promise<Accounts | null>;
  makeDeposit(accountId: string, amount: number): Promise<Accounts | null>;
  generateNumber(): number;
  generateAccount(): string;
}
