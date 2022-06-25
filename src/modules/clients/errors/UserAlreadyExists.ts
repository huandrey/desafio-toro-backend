export default class UserNotFound extends Error {
  constructor(cpf: string) {
    super(`User with ${cpf} already exists.`);
    this.name = "UserNotFound";
    this.message = `User with ${cpf} already exists.`;
  }
}
