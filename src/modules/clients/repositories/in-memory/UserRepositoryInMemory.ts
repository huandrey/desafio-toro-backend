import { UserDTO } from "../../DTO/UserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async createUser({
    cpf,
    email,
    fname,
    lname,
    password,
  }: UserDTO): Promise<User | undefined | null> {
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

  async findById(id: string): Promise<User | undefined | null> {
    return this.users.find((user) => user.id === id);
  }

  async findByCpf(cpf: string): Promise<User | undefined | null> {
    return this.users.find((user) => user.cpf === cpf);
  }

  async findByEmail(email: string): Promise<User | undefined | null> {
    return this.users.find((user) => user.email === email);
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
