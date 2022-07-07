import { AccountRepositoryInMemory } from "modules/accounts/repositories/in-memory/AccountRepositoryInMemory";
import { GetAccountUseCase } from "modules/accounts/useCases/GetAccount/GetAccountUseCase";
import { TransactionRepositoryInMemory } from "modules/transactions/repositories/in-memory/TransactionRepositoryInMemory";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateAccountUseCase } from "../../../accounts/useCases/CreateAccount/CreateAccountUseCase";
import { UserRepositoryInMemory } from "../../../clients/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../clients/useCases/CreateUser/CreateUserUseCase";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

let transactionRepositoryInMemory: TransactionRepositoryInMemory;
let createTransactionUseCase: CreateTransactionUseCase;
let createUserUseCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;
let getAccountUseCase: GetAccountUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let accountRepositoryInMemory: AccountRepositoryInMemory;

describe("Create transaction", () => {
  beforeEach(() => {
    transactionRepositoryInMemory = new TransactionRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    accountRepositoryInMemory = new AccountRepositoryInMemory();
    getAccountUseCase = new GetAccountUseCase(
      userRepositoryInMemory,
      accountRepositoryInMemory
    );
    createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepositoryInMemory,
      userRepositoryInMemory,
      accountRepositoryInMemory
    );
    createAccountUseCase = new CreateAccountUseCase(
      userRepositoryInMemory,
      accountRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to make a new transaction if user and account exists", async () => {
    const { data: user } = await createUserUseCase.execute({
      fname: "John",
      lname: "Doe",
      email: "any@test.com",
      cpf: "00000000000",
      password: "12345678",
    });
    const { data: account } = await createAccountUseCase.execute(user.id);

    const { data: transaction } = await createTransactionUseCase.execute({
      event: "TRANSFER",
      target: {
        bank: account.bank,
        branch: account.agency_number,
        account: account.account_number,
      },
      origin: {
        bank: "033",
        branch: "03312",
        cpf: "00000000000",
      },
      amount: 102.55,
    });
    expect(transaction).toHaveProperty("id");
  });

  it("should be able change balance of an account if a transaction has been created", async () => {
    const { data: user } = await createUserUseCase.execute({
      fname: "John",
      lname: "Doe",
      email: "any@test.com",
      cpf: "00000000000",
      password: "12345678",
    });
    const { data: targetAccount } = await createAccountUseCase.execute(user.id);

    await createTransactionUseCase.execute({
      event: "TRANSFER",
      target: {
        bank: targetAccount.bank,
        branch: targetAccount.agency_number,
        account: targetAccount.account_number,
      },
      origin: {
        bank: "033",
        branch: "03312",
        cpf: "00000000000",
      },
      amount: 102.55,
    });

    const { data: account } = await getAccountUseCase.execute(user.id);

    expect(account.balance).toBe(102.55);
  });

  it("should not be able make an transaction if user cpf not be equal to the account registered", async () => {
    const { data: user } = await createUserUseCase.execute({
      fname: "John",
      lname: "Doe",
      email: "any@test.com",
      cpf: "00000000000",
      password: "12345678",
    });

    expect(async () => {
      await createTransactionUseCase.execute({
        event: "TRANSFER",
        target: {
          bank: "352",
          branch: "0001",
          account: "345432",
        },
        origin: {
          bank: "033",
          branch: "03312",
          cpf: "11111111111",
        },
        amount: 102.55,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
