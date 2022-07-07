import { AccountRepository } from "@modules/accounts/repositories/AccountRepository";
import { UserRepository } from "@modules/clients/repositories/UserRepository";
import { Request, Response } from "express";

import { CreateAccountUseCase } from "./CreateAccountUseCase";

const accountRep = new AccountRepository();
const userRep = new UserRepository();

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    const createAccountUseCase = new CreateAccountUseCase(userRep, accountRep);

    const res = await createAccountUseCase.execute(userId);

    return response.status(res.statusCode).json(res);
  }
}
