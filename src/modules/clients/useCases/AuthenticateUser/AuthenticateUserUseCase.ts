import { sign } from "jsonwebtoken";
import { UserRepository } from "modules/clients/repositories/UserRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { checkPassword } from "../../../../utils/encrypt";
import { CredentialError } from "../../errors";
import { badRequest, getSuccessRequest } from "../../helpers/http-helper";
import { UserService } from "../../services/UserService";

interface IUser {
  id: string;
  email: string;
  password?: string;
}

export class AuthenticateUserUseCase {
  constructor(private userRep: UserRepository) {}
  async execute({ email, password }: any): Promise<any> {
    const user = (await this.userRep.findByEmail(email)) as IUser;

    if (!user) {
      throw new AppError("email or password incorrect");
    }

    const pswdMatch = await checkPassword(password, user?.password || "");

    if (!pswdMatch) {
      throw new AppError("email or password incorrect");
    }

    const token = sign({ id: user.id }, "0f55ec417962236d0c4d66753f3199d4", {
      expiresIn: "1h",
    });

    delete user.password;

    return getSuccessRequest("User authorized.", {
      user,
      token,
    });
  }
}
