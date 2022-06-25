import { UserDTO } from "../DTO/UserDTO";
import { UserRepository } from "../repositories/UserRepository";

/* eslint-disable @typescript-eslint/no-empty-function */
export class UserService {
  constructor(private userRep: UserRepository) {}

  async createUser({ cpf, email, fname, lname, password }: UserDTO) {
    return this.userRep.createUser({ cpf, email, fname, lname, password });
  }

  async deleteUser() {}

  async updateUser() {}

  async getUserById(id: string) {
    return this.userRep.findById(id);
  }

  async verifyUserAlreadyExists(cpf: string, email: string) {
    const userByCpf = await this.getUserByCpf(cpf);
    const userByEmail = await this.getUserByEmail(email);

    return userByCpf?.cpf || userByEmail?.email;
  }

  async getUserByCpf(cpf: string) {
    return this.userRep.findByCpf(cpf);
  }

  async getUserByEmail(email: string) {
    return this.userRep.findByEmail(email);
  }
}
