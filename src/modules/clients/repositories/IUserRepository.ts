import { Users } from "@prisma/client";

import { UserDTO } from "../DTO/UserDTO";

export interface IUserRepository {
  createUser(data: UserDTO): Promise<Users>;
  findById(id: string): Promise<Users | null>;
  findByCpf(cpf: string): Promise<Users | null>;
  findByEmail(email: string): Promise<Users | null>;
  verifyUserAlreadyExists(
    cpf: string,
    email: string
  ): Promise<string | undefined | null>;
}
