import { Request, Response } from "express";

import { UserRepository } from "../../../clients/repositories/UserRepository";
import { UserService } from "../../../clients/services/UserService";
import { AccountRepository } from "../../repositories/AccountRepository";
import { AccountService } from "../../services/AccountService";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

const accountRep = new AccountRepository();
const accountServive = new AccountService(accountRep);
const userRep = new UserRepository();
const userService = new UserService(userRep);

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    const createAccountUseCase = new CreateAccountUseCase(
      userService,
      accountServive
    );

    console.log(userId);

    const res = await createAccountUseCase.execute(userId);

    return response.status(res.statusCode).json(res);
  }
}
