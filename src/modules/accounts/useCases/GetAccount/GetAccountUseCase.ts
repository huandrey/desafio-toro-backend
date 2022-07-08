import { AccountRepository } from "modules/accounts/repositories/AccountRepository";
import { UserRepository } from "modules/clients/repositories/UserRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { getSuccessRequest } from "../../../clients/helpers/http-helper";

export class GetAccountUseCase {
  constructor(
    private userRep: UserRepository,
    private accountRep: AccountRepository
  ) {}

  async execute(userId: string) {
    const userAlreadyExist = await this.userRep.findById(userId);

    if (!userAlreadyExist) {
      throw new AppError("User not found");
    }

    const account = await this.accountRep.findAccountByUserId(userId);
    // ja possui uma conta?

    return getSuccessRequest("Success account get.", account);
  }
}
