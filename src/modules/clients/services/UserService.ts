import { UserRepository } from "../repositories/UserRepository";

/* eslint-disable @typescript-eslint/no-empty-function */
export class UserService {
  constructor(private userRep: UserRepository) {}

  async createUser({ cpf, email, fname, lname, password }: any) {
    return this.userRep.createUser({ cpf, email, fname, lname, password });
  }

  async deleteUser() {}

  async updateUser() {}

  async getUserById(id: string) {
    return this.userRep.findById(id);
  }

  async getUserByCpf(cpf: string) {
    return this.userRep.findByCpf(cpf);
  }
}
