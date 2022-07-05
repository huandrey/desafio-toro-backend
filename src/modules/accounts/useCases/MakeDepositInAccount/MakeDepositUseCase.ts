import {
  badRequest,
  sucessCreatedRequest,
} from "../../../clients/helpers/http-helper";
import { AccountService } from "../../services/AccountService";

export class MakeDepositUseCase {
  constructor(private accountService: AccountService) {}

  async execute(userId: string) {
    try {
      const userAccountAlreadyExists =
        await this.accountService.verifyUserAccountAlreadyExistsById(userId);
      // ja possui uma conta?

      if (!userAccountAlreadyExists) {
        // return badRequest(new AccountAlreadyExists().message);
      }

      const account = await this.accountService.createAccount(userId);

      return sucessCreatedRequest("Success account created", account);
    } catch (err) {
      return badRequest("Some error occured while creating account", 500);
    }
  }
}
