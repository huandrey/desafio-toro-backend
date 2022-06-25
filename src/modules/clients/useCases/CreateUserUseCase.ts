import { MissingParamError } from "../errors/MissingParamError";
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
  async execute(body: any): Promise<any> {
    const requiredFields = ["fname", "lname", "email", "cpf", "password"];

    try {
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const userAlreadyExist = await this.userService.getUserByCpf(body.cpf);

      if (userAlreadyExist) {
        throw new Error("User already exists!");
      }

      const user = await this.userService.createUser(body);

      return sucessCreatedRequest("Success user created.", user);
    } catch (err) {
      console.log(err);
    }
  }
}
