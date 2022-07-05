import { Request, Response } from "express";

import { UserRepository } from "../../../clients/repositories/UserRepository";
import { AccountRepository } from "../../repositories/AccountRepository";
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
