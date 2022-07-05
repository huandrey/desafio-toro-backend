// import { User } from "../../entities/User";
// import { UserAlreadyExists } from "../../errors";
import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Authenticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
  });

  it("should be able to authenticate an user", async () => {
    const user = {
      email: "john.doe@mail.com",
      cpf: "12345678910",
      fname: "John",
      lname: "Doe",
      password: "doedoe",
    };
    await createUserUseCase.execute(user);

    const { data, statusCode } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(data).toHaveProperty("token");
    expect(statusCode).toBe(200);
  });

  it("should not be able to authenticate an user with password incorrect", async () => {
    const user = {
      email: "john.doe@mail.com",
      cpf: "12345678910",
      fname: "John",
      lname: "Doe",
      password: "doedoe",
    };
    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "other",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with email incorrect", async () => {
    const user = {
      email: "john.doe@mail.com",
      cpf: "12345678910",
      fname: "John",
      lname: "Doe",
      password: "doedoe",
    };
    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "other@mail.com",
        password: "doedoe",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
