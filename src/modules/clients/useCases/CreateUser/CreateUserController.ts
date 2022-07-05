import { Request, Response } from "express";

import { UserRepository } from "../../repositories/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRep = new UserRepository();

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, email, fname, lname, password } = request.body;

    const createUserUseCase = new CreateUserUseCase(userRep);

    const res = await createUserUseCase.execute({
      cpf,
      email,
      fname,
      lname,
      password,
    });

    return response.status(res.statusCode).json(res);
  }
}
