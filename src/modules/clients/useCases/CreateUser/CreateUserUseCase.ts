import { cryptPassword } from "../../../../utils/encript";
import { MissingParamError, UserAlreadyExists } from "../../errors";
import { badRequest, sucessCreatedRequest } from "../../helpers/http-helper";
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

export class CreateUserUseCase {
  constructor(private userService: UserService) {}

  // eslint-disable-next-line consistent-return
  async execute(body: any): Promise<any> {
    const requiredFields = ["fname", "lname", "email", "cpf", "password"];

    try {
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field).message);
        }
      }

      const { cpf, email, password } = body;

      const userAlreadyExist = await this.userService.verifyUserAlreadyExists(
        cpf,
        email
      );

      if (userAlreadyExist) {
        return badRequest(new UserAlreadyExists(userAlreadyExist).message);
      }

      const pswdHash = await cryptPassword(password);

      const user = await this.userService.createUser({
        ...body,
        password: pswdHash,
      });

      return sucessCreatedRequest("Success user created.", user);
    } catch (err) {
      return badRequest("Some error occurred while creating user");
    }
  }
}
