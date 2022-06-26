import { sign } from "jsonwebtoken";

import { checkPassword } from "../../../../utils/encript";
import { CredentialError } from "../../errors";
import { badRequest, getSuccessRequest } from "../../helpers/http-helper";
import { UserService } from "../../services/UserService";

interface IUser {
  id: string;
  password?: string;
}

export class AuthenticateUserUseCase {
  constructor(private userService: UserService) {}
  async execute({ email, password }: any): Promise<any> {
    try {
      const user = (await this.userService.getUserByEmail(email)) as IUser;

      if (!user) {
        return badRequest(
          new CredentialError("email or password incorrect").message
        );
      }

      const pswdMatch = await checkPassword(password, user?.password || "");

      if (!pswdMatch) {
        return badRequest(
          new CredentialError("email or password incorrect").message
        );
      }

      const token = sign({ id: user.id }, "0f55ec417962236d0c4d66753f3199d4", {
        expiresIn: "1h",
      });

      delete user.password;

      return getSuccessRequest("User authorized.", {
        user,
        token,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
