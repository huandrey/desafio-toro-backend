import { Request, Response } from "express";

import { UserRepository } from "../../../clients/repositories/UserRepository";
import { UserService } from "../../../clients/services/UserService";
import { AccountRepository } from "../../repositories/AccountRepository";
import { AccountService } from "../../services/AccountService";
import { GetAccountUseCase } from "./GetAccountUseCase";

const accountRep = new AccountRepository();
const userRep = new UserRepository();
const accountServive = new AccountService(accountRep, userRep);
const userService = new UserService(userRep);

export class GetAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    const getAccountUseCase = new GetAccountUseCase(
      userService,
      accountServive
    );

    const res = await getAccountUseCase.execute(userId);

    return response.status(res.statusCode).json(res);
  }
}
