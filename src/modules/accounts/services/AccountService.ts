import { AccountRepository } from "../repositories/AccountRepository";

export class AccountService {
  constructor(private accountRep: AccountRepository) {}

  async createAccount(userId: string) {
    const agencyNumber = "0001";
    const accountNumber = this.generateAccount();
    const balance = 0;
    const account = await this.accountRep.createAccount({
      userId,
      agencyNumber,
      accountNumber,
      balance,
    });

    return account;
  }

  generateNumber() {
    const max = 60;
    const min = 1;
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

  async verifyUserAccountAlreadyExists(userId: string) {
    const account = await this.accountRep.findAccountByUserId(userId);

    return account;
  }
}
