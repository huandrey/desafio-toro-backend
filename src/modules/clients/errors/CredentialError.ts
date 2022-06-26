export default class CredentialError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CredentialError";
    this.message = message;
  }
}
