import { AppError } from "../../../../shared/errors/AppError";
import { cryptPassword } from "../../../../utils/encrypt";
import { User } from "../../entities/User";
import { MissingParamError, UserAlreadyExists } from "../../errors";
import { badRequest, sucessCreatedRequest } from "../../helpers/http-helper";
import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../../services/UserService";

interface ICreateUserProps {
  cpf: string;
  email: string;
  fname: string;
  lname: string;
  password: string;
}

interface ICreateUser {
  [key: string]: ICreateUserProps;
}

interface IUser {
  id: string;
  password?: string;
}

export class CreateUserUseCase {
  constructor(private userRep: UserRepository) {}

  // eslint-disable-next-line consistent-return
  async execute(body: any): Promise<any> {
    const requiredFields = ["fname", "lname", "email", "cpf", "password"];

    for (const field of requiredFields) {
      if (!body[field]) {
        throw new AppError(`Missing param: ${field}`);
      }
    }

    const { cpf, email, password } = body;

    const userAlreadyExist = await this.userRep.verifyUserAlreadyExists(
      cpf,
      email
    );

    if (userAlreadyExist) {
      throw new AppError(`User with ${userAlreadyExist} already exists.`);
    }

    const pswdHash = await cryptPassword(password);

    const user = (await this.userRep.createUser({
      ...body,
      password: pswdHash,
    })) as IUser;

    // delete user.password;

    return sucessCreatedRequest("Success user created.", {
      ...user,
      password: "",
    });
  }
}
