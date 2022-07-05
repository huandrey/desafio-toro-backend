// import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
// import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { badRequest } from "../../../modules/clients/helpers/http-helper";

// import { AppError } from "@shared/errors/AppError";

interface IPayload {
  id: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({
      message: "Token missing",
      statusCode: 401,
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { id: user_id } = verify(
      token,
      "0f55ec417962236d0c4d66753f3199d4"
    ) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    return response.status(401).send({
      message: "Invalid token.",
      statusCode: 401,
    });
  }
}
