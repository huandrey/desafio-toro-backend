import { Request, Response } from "express";

import { UserRepository } from "../../repositories/UserRepository";
import { RecoveryUserUseCase } from "./RecoveryUserUseCase";

const userRep = new UserRepository();

export class RecoveryUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const recoveryUserUseCase = new RecoveryUserUseCase(userRep);

    const res = await recoveryUserUseCase.execute(id);

    return response.status(res.statusCode).json(res);
  }
}
