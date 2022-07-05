import { UserRepository } from "modules/clients/repositories/UserRepository";

import { UserNotFound } from "../../../clients/errors";
import {
  badRequest,
  sucessCreatedRequest,
} from "../../../clients/helpers/http-helper";
import { AccountService } from "../../services/AccountService";

export class GetAccountUseCase {
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

      const account =
        await this.accountService.verifyUserAccountAlreadyExistsById(userId);
      // ja possui uma conta?

      return sucessCreatedRequest("Success account get.", account);
    } catch (err) {
      return badRequest("Some error occured while get account", 500);
    }
  }
}
