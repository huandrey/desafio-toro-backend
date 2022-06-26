export default class AccountAlreadyExists extends Error {
  constructor() {
    super(`User already has account.`);
    this.name = "AccountAlreadyExists";
    this.message = `User already has account.`;
  }
}
