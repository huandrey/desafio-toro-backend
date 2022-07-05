import { Request, Response } from "express";

import { UserRepository } from "../../../clients/repositories/UserRepository";
import { UserService } from "../../../clients/services/UserService";
import { AccountRepository } from "../../repositories/AccountRepository";
import { AccountService } from "../../services/AccountService";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

const accountRep = new AccountRepository();
const userRep = new UserRepository();
const accountServive = new AccountService(accountRep, userRep);
const userService = new UserService(userRep);

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    const createAccountUseCase = new CreateAccountUseCase(
      userService,
      accountServive
    );

    const res = await createAccountUseCase.execute(userId);

    return response.status(res.statusCode).json(res);
  }
}
