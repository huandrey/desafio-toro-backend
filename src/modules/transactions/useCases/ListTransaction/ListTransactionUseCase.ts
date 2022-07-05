import {
  badRequest,
  getSuccessRequest,
} from "../../../clients/helpers/http-helper";
import { TransactionService } from "../../services/TransactionService";

export class ListTransactionUseCase {
  constructor(private transactionService: TransactionService) {}

  async execute(id: string) {
    try {
      const transactions = await this.transactionService.listTransactions(id);
      console.log(transactions);
      return getSuccessRequest("Success list transactions", {
        transactions,
      });
      // return
    } catch (err) {
      return badRequest("Some error occured while list accounts", 500);
    }
  }
}
