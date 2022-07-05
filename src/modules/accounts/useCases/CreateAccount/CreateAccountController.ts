import { Request, Response } from "express";

import { UserRepository } from "../../../clients/repositories/UserRepository";
import { AccountRepository } from "../../repositories/AccountRepository";
import { AccountService } from "../../services/AccountService";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

const accountRep = new AccountRepository();
const userRep = new UserRepository();
const accountServive = new AccountService(accountRep, userRep);

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    const createAccountUseCase = new CreateAccountUseCase(
      userRep,
      accountServive
    );

    const res = await createAccountUseCase.execute(userId);

    return response.status(res.statusCode).json(res);
  }
}
