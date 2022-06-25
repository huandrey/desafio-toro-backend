import { prisma } from "../../../database";

export class UserRepository {
  async createUser({ cpf, email, fname, lname, password }: any) {
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

  async findById(id: string) {
    const userAlreadyExist = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return userAlreadyExist;
  }

  async findByCpf(cpf: string) {
    const userAlreadyExist = await prisma.users.findUnique({
      where: {
        cpf,
      },
    });

    return userAlreadyExist;
  }
}
