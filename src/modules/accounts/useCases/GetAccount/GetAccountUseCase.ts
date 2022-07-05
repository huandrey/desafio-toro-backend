import { UserNotFound } from "../../../clients/errors";
import {
  badRequest,
  sucessCreatedRequest,
} from "../../../clients/helpers/http-helper";
import { UserService } from "../../../clients/services/UserService";
import AccountAlreadyExists from "../../errors/AccountAlreadyExists";
import { AccountService } from "../../services/AccountService";

export class GetAccountUseCase {
  constructor(
    private userService: UserService,
    private accountService: AccountService
  ) {}

  async execute(userId: string) {
    try {
      const userAlreadyExist = await this.userService.getUserById(userId);

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
