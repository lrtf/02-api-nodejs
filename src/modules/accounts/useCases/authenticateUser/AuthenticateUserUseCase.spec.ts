import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let autheticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        autheticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            email: "user@test.com",
            password: "0123",
            driver_license: "1234",
        };

        await createUserUseCase.execute(user);

        const result = await autheticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an no existent user", () => {
        expect(async () => {
            await autheticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test Error",
                email: "user@user.com",
                password: "1234",
                driver_license: "010203",
            };

            await createUserUseCase.execute(user);

            await autheticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPass",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
