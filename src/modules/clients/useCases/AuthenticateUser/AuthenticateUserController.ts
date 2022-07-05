import { Request, Response } from "express";

import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../../services/UserService";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const userRep = new UserRepository();
// const userService = new UserService(userRep);

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase(userRep);

    const res = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.status(res.statusCode).json(res);
  }
}
