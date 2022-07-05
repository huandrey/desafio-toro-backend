import { AccountRepository } from "modules/accounts/repositories/AccountRepository";
import { UserRepository } from "modules/clients/repositories/UserRepository";
import { TransferBankDTO } from "modules/transactions/DTO/TransferDTO";
import { TransactionRepository } from "modules/transactions/repositories/TransactionRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { sucessCreatedRequest } from "../../../clients/helpers/http-helper";
import { TransactionService } from "../../services/TransactionService";

export class CreateTransactionUseCase {
  constructor(
    private transationRep: TransactionRepository,
    private userRep: UserRepository,
    private accountRep: AccountRepository
  ) {}

  async execute(transferDTO: TransferBankDTO) {
    const { event, target, origin, amount } = transferDTO;

    if (event !== "TRANSFER") {
      throw new AppError("Invalid event passed.");
    }

    // verificar se todos os dados foram preenchidos

    const userExists = await this.userRep.findByCpf(origin?.cpf);

    if (!userExists || !userExists.id) {
      throw new AppError("User not exists.");
    }

    const userAccountAlreadyExists = await this.accountRep.findAccountByUserId(
      userExists?.id
    );

    if (!userAccountAlreadyExists) {
      throw new AppError("User account hasn't exists.");
    }

    const transaction = await this.transationRep.makeTransfer(
      userAccountAlreadyExists.id,
      origin,
      amount
    );

    this.accountRep.makeDeposit(userAccountAlreadyExists.id, amount);

    return sucessCreatedRequest("Successful transaction.", transaction);
  }
}
