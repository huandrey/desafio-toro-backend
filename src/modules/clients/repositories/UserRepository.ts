import { prisma } from "../../../database";
import { UserDTO } from "../DTO/UserDTO";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async createUser({
    cpf,
    email,
    fname,
    lname,
    password,
  }: UserDTO): Promise<User | undefined | null> {
    const user = await prisma.users.create({
      data: {
        cpf,
        email,
        first_name: fname,
        last_name: lname,
        password,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined | null> {
    const userAlreadyExist = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return userAlreadyExist;
  }

  async findByCpf(cpf: string): Promise<User | undefined | null> {
    const userAlreadyExist = await prisma.users.findUnique({
      where: {
        cpf,
      },
    });

    return userAlreadyExist;
  }

  async findByEmail(email: string): Promise<User | undefined | null> {
    const userAlreadyExist = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return userAlreadyExist;
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
