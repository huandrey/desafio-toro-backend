import { Users } from "@prisma/client";

import { UserDTO } from "../../DTO/UserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  users: Users[] = [];

  async createUser({
    cpf,
    email,
    fname,
    lname,
    password,
  }: UserDTO): Promise<Users> {
    const user = new User();

    Object.assign(user, {
      cpf,
      email,
      first_name: fname,
      last_name: lname,
      password,
    });

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<Users | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;

    return user;
  }

  async findByCpf(cpf: string): Promise<Users | null> {
    const user = this.users.find((user) => user.cpf === cpf);

    if (!user) return null;

    return user;
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async verifyUserAlreadyExists(
    cpf: string,
    email: string
  ): Promise<string | undefined | null> {
    const userByCpf = await this.findByCpf(cpf);
    const userByEmail = await this.findByEmail(email);

    return userByCpf?.cpf || userByEmail?.email;
  }
}
