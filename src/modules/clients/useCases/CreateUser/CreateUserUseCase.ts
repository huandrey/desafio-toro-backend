import { cryptPassword } from "../../../../utils/encrypt";
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

interface IUser {
  id: string;
  password?: string;
}

export class CreateUserUseCase {
  constructor(private userService: UserService) {}

  // eslint-disable-next-line consistent-return
  async execute(body: any): Promise<any> {
    const requiredFields = ["fname", "lname", "email", "cpf", "password"];

    try {
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field).message, 400);
        }
      }

      const { cpf, email, password } = body;

      const userAlreadyExist = await this.userService.verifyUserAlreadyExists(
        cpf,
        email
      );

      if (userAlreadyExist) {
        return badRequest(new UserAlreadyExists(userAlreadyExist).message, 400);
      }

      const pswdHash = await cryptPassword(password);

      const user = (await this.userService.createUser({
        ...body,
        password: pswdHash,
      })) as IUser;

      delete user.password;

      return sucessCreatedRequest("Success user created.", user);
    } catch (err) {
      return badRequest("Some error occurred while creating user", 400);
    }
  }
}
