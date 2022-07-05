export class TargetBankDTO {
  public bank: string;

  public branch: string;

  public account: string;

  constructor(bank: string, branch: string, account: string) {
    this.bank = bank;
    this.branch = branch;
    this.account = account;
  }
}
