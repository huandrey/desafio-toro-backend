export class SourceBankDTO {
  public bank: string;

  public branch: string;

  public cpf: string;

  constructor(bank: string, branch: string, cpf: string) {
    this.bank = bank;
    this.branch = branch;
    this.cpf = cpf;
  }
}
