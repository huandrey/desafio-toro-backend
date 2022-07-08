import { AppError } from "../../../../shared/errors/AppError";
import { getSuccessRequest } from "../../helpers/http-helper";
import { UserRepository } from "../../repositories/UserRepository";

export class RecoveryUserUseCase {
  constructor(private userRep: UserRepository) {}

  async execute(id: string): Promise<any> {
    const user = await this.userRep.findById(id);
    console.log(user);
    if (!user) {
      throw new AppError(`User not found.`);
    }

    return getSuccessRequest("Success user found.", user);
  }
}
