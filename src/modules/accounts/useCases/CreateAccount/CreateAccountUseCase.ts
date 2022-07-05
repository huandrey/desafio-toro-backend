import { AccountRepository } from "modules/accounts/repositories/AccountRepository";
import { UserRepository } from "modules/clients/repositories/UserRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { sucessCreatedRequest } from "../../../clients/helpers/http-helper";

export class CreateAccountUseCase {
  constructor(
    private userRep: UserRepository,
    private accountRep: AccountRepository
  ) {}

  async execute(userId: string) {
    const userAlreadyExist = await this.userRep.findById(userId);

    if (!userAlreadyExist) {
      throw new AppError("User not exist.");
    }

    const userAccountAlreadyExists = await this.accountRep.findAccountByUserId(
      userId
    );
    // ja possui uma conta?

    if (userAccountAlreadyExists) {
      throw new AppError("User already has account.");
    }

    const account = await this.accountRep.createAccount(userId);

    return sucessCreatedRequest("Success account created", account);
  }
}
