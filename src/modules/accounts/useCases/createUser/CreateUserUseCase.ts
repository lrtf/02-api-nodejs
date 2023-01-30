import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersReposiotry } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersReposiotry
    ) {}

    async execute({
        id,
        name,
        email,
        password,
        driver_license,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists!");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            id,
            name,
            email,
            password: passwordHash,
            driver_license,
            avatar,
        });
    }
}
