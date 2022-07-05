import { AppError } from "../../../../shared/errors/AppError";
import { cryptPassword } from "../../../../utils/encrypt";
import { sucessCreatedRequest } from "../../helpers/http-helper";
import { UserRepository } from "../../repositories/UserRepository";

interface IUser {
  id: string;
  password?: string;
}

export class CreateUserUseCase {
  constructor(private userRep: UserRepository) {}

  async execute(userDTO: any): Promise<any> {
    const requiredFields = ["fname", "lname", "email", "cpf", "password"];

    for (const field of requiredFields) {
      if (!userDTO[field]) {
        throw new AppError(`Missing param: ${field}`);
      }
    }

    const { cpf, email, password } = userDTO;

    const userAlreadyExist = await this.userRep.verifyUserAlreadyExists(
      cpf,
      email
    );

    if (userAlreadyExist) {
      throw new AppError(`User with ${userAlreadyExist} already exists.`);
    }

    const pswdHash = await cryptPassword(password);

    const user = (await this.userRep.createUser({
      ...userDTO,
      password: pswdHash,
    })) as IUser;

    // delete user.password;

    return sucessCreatedRequest("Success user created.", {
      ...user,
      password: "",
    });
  }
}
