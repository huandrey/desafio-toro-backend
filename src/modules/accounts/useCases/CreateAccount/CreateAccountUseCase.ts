import { UserRepository } from "modules/clients/repositories/UserRepository";

import { UserNotFound } from "../../../clients/errors";
import {
  badRequest,
  sucessCreatedRequest,
} from "../../../clients/helpers/http-helper";
import AccountAlreadyExists from "../../errors/AccountAlreadyExists";
import { AccountService } from "../../services/AccountService";

export class CreateAccountUseCase {
  constructor(
    private userRep: UserRepository,
    private accountService: AccountService
  ) {}

  async execute(userId: string) {
    try {
      const userAlreadyExist = await this.userRep.findById(userId);

      if (!userAlreadyExist) {
        return badRequest(new UserNotFound(userId).message, 400);
      }

      const userAccountAlreadyExists =
        await this.accountService.verifyUserAccountAlreadyExistsById(userId);
      // ja possui uma conta?

      if (userAccountAlreadyExists) {
        return badRequest(new AccountAlreadyExists().message, 400);
      }

      const account = await this.accountService.createAccount(userId);

      return sucessCreatedRequest("Success account created", account);
    } catch (err) {
      return badRequest("Some error occured while creating account", 500);
    }
  }
}
