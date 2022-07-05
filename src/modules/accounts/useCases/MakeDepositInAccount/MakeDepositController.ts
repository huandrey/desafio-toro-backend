import { Request, Response } from "express";

import { UserRepository } from "../../../clients/repositories/UserRepository";
import { AccountRepository } from "../../repositories/AccountRepository";
import { AccountService } from "../../services/AccountService";
import { MakeDepositUseCase } from "./MakeDepositUseCase";

const userRep = new UserRepository();
const accountRep = new AccountRepository();
const accountServive = new AccountService(accountRep, userRep);

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    const makeDepositUseCase = new MakeDepositUseCase(accountServive);

    const res = await makeDepositUseCase.execute(userId);

    return response.status(res.statusCode).json(res);
  }
}
