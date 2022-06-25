export default class UserNotFound extends Error {
  constructor(cpf: string) {
    super(`User with ${cpf} not exist.`);
    this.name = "UserNotFound";
    this.message = `User with ${cpf} not exist.`;
  }
}
