import { MissingParamError, UserAlreadyExists } from "../errors";
import { badRequest, sucessCreatedRequest } from "../helpers/http-helper";
import { UserService } from "../services/UserService";

interface ICreateBody {
  cpf: string;
  email: string;
  fname: string;
  lname: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private userService: UserService) {}

  // eslint-disable-next-line consistent-return
  async execute(body: ICreateBody): Promise<any> {
    const requiredFields = ["fname", "lname", "email", "cpf", "password"];

    try {
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field).message);
        }
      }

      const { cpf, email } = body;

      const userAlreadyExist = await this.userService.verifyUserAlreadyExists(
        cpf,
        email
      );

      if (userAlreadyExist) {
        return badRequest(new UserAlreadyExists(userAlreadyExist).message);
      }

      const user = await this.userService.createUser(body);

      return sucessCreatedRequest("Success user created.", user);
    } catch (err) {
      console.log(err);
    }
  }
}
