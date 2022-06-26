import { UserNotFound } from "../../../clients/errors";
import {
  badRequest,
  sucessCreatedRequest,
} from "../../../clients/helpers/http-helper";
import { UserService } from "../../../clients/services/UserService";
import AccountAlreadyExists from "../../errors/AccountAlreadyExists";
import { AccountService } from "../../services/AccountService";

export class CreateAccountUseCase {
  constructor(
    private userService: UserService,
    private accountService: AccountService
  ) {}

  async execute(userId: string) {
    try {
      const userAlreadyExist = await this.userService.getUserById(userId);

      if (!userAlreadyExist) {
        return badRequest(new UserNotFound(userId).message);
      }

      const userAccountAlreadyExists =
        await this.accountService.verifyUserAccountAlreadyExistsById(userId);
      // ja possui uma conta?

      if (userAccountAlreadyExists) {
        return badRequest(new AccountAlreadyExists().message);
      }

      const account = await this.accountService.createAccount(userId);

      return sucessCreatedRequest("Success account created", account);
    } catch (err) {
      return badRequest("Some error occured while creating account");
    }
  }
}
