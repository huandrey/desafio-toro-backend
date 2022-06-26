export default class AccountNotFound extends Error {
  constructor() {
    super(`Account not found.`);
    this.name = "AccountNotFound";
    this.message = `Account not found.`;
  }
}
