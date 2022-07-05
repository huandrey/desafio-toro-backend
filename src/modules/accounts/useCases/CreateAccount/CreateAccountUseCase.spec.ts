import { AccountRepositoryInMemory } from "modules/accounts/repositories/in-memory/AccountRepositoryInMemory";

import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../../clients/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../clients/useCases/CreateUser/CreateUserUseCase";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

let createUserUseCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let accountRepositoryInMemory: AccountRepositoryInMemory;

describe("Create account", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    accountRepositoryInMemory = new AccountRepositoryInMemory();
    createAccountUseCase = new CreateAccountUseCase(
      userRepositoryInMemory,
      accountRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to create a new account if user exists", async () => {
    const { data: user } = await createUserUseCase.execute({
      fname: "John",
      lname: "Doe",
      email: "any@test.com",
      cpf: "00000000000",
      password: "12345678",
    });
    const { data: account } = await createAccountUseCase.execute(user.id);
    expect(account).toHaveProperty("id");
  });

  it("should not be able to create a new account if user not exists", async () => {
    await expect(async () => {
      await createAccountUseCase.execute("some_id");
    }).rejects.toBeInstanceOf(AppError);
  });
});
