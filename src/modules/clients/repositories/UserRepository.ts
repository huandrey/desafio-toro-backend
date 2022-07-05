import { Users } from "@prisma/client";

import { prisma } from "../../../database";
import { UserDTO } from "../DTO/UserDTO";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  async createUser({
    cpf,
    email,
    fname,
    lname,
    password,
  }: UserDTO): Promise<Users> {
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

  async findById(id: string): Promise<Users | null> {
    const userAlreadyExist = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return userAlreadyExist;
  }

  async findByCpf(cpf: string): Promise<Users | null> {
    const userAlreadyExist = await prisma.users.findUnique({
      where: {
        cpf,
      },
    });

    return userAlreadyExist;
  }

  async findByEmail(email: string): Promise<Users | null> {
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
