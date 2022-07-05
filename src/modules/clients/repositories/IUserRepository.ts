// import { User } from '../infra/database';
import { UserDTO } from "../DTO/UserDTO";
import { User } from "../entities/User";
// import { UpdateResult } from 'typeorm';

export interface IUserRepository {
  createUser(data: UserDTO): Promise<User | undefined | null>;
  findById(id: string): Promise<User | undefined | null>;
  findByCpf(cpf: string): Promise<User | undefined | null>;
  findByEmail(email: string): Promise<User | undefined | null>;
  verifyUserAlreadyExists(
    cpf: string,
    email: string
  ): Promise<string | undefined | null>;
}
