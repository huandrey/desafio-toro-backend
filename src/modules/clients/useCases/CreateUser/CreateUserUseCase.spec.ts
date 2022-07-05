// import { User } from "../../entities/User";
// import { UserAlreadyExists } from "../../errors";
import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Create user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    await createUserUseCase.execute({
      fname: "John",
      lname: "Doe",
      email: "any@test.com",
      cpf: "00000000000",
      password: "12345678",
    });

    const userFound = await userRepositoryInMemory.findByEmail("any@test.com");

    expect(userFound).toHaveProperty("id");
  });

  it("should not be able to create a new user with same cpf", async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        fname: "John",
        lname: "Doe",
        email: "any@test.com",
        cpf: "00000000000",
        password: "12345678",
      });

      await createUserUseCase.execute({
        fname: "John",
        lname: "Doe",
        email: "other@test.com",
        cpf: "00000000000",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new user with same email", async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        fname: "John",
        lname: "Doe",
        email: "other@test.com",
        cpf: "12345678911",
        password: "12345678",
      });

      await createUserUseCase.execute({
        fname: "John",
        lname: "Doe",
        email: "other@test.com",
        cpf: "12345678910",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new user without fname", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        fname: "",
        lname: "Doe",
        email: "other@test.com",
        cpf: "12345678911",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a new user without lname", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        fname: "John",
        lname: "",
        email: "other@test.com",
        cpf: "12345678911",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a new user without email", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        fname: "John",
        lname: "Doe",
        email: "",
        cpf: "12345678911",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a new user without cpf", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        fname: "John",
        lname: "Doe",
        email: "other@test.com",
        cpf: "",
        password: "12345678",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a new user without password", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        fname: "John",
        lname: "Doe",
        email: "other@test.com",
        cpf: "12345678911",
        password: "",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
