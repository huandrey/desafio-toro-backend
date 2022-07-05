import { Request, Response } from "express";

import { UserRepository } from "../../../clients/repositories/UserRepository";
import { AccountRepository } from "../../repositories/AccountRepository";
import { GetAccountUseCase } from "./GetAccountUseCase";

const accountRep = new AccountRepository();
const userRep = new UserRepository();

export class GetAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    const getAccountUseCase = new GetAccountUseCase(userRep, accountRep);

    const res = await getAccountUseCase.execute(userId);

    return response.status(res.statusCode).json(res);
  }
}
