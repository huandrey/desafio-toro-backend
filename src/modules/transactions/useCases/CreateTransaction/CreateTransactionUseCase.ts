import AccountNotFound from "../../../accounts/errors/AccountNotFound";
import { AccountService } from "../../../accounts/services/AccountService";
import {
  badRequest,
  sucessCreatedRequest,
} from "../../../clients/helpers/http-helper";
import { TransactionService } from "../../services/TransactionService";

export class CreateTransactionUseCase {
  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  async execute(transferDTO: any) {
    try {
      const { event, target, origin, amount } = transferDTO;

      if (event !== "TRANSFER") {
        // exception
      }

      // verificar se todos os dados foram preenchidos

      const userAccountAlreadyExists =
        await this.accountService.verifyUserAccountAlreadyExistsByCpf(
          origin.cpf
        );

      if (!userAccountAlreadyExists) {
        return badRequest(new AccountNotFound().message);
      }

      const account = await this.transactionService.makeTransfer(
        userAccountAlreadyExists.id,
        origin,
        amount
      );

      return sucessCreatedRequest("Success account created", account);
    } catch (err) {
      console.log(err);
      return badRequest("Some error occured while creating account");
    }
  }
}
