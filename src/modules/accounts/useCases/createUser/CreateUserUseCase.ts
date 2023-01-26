import { inject } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersReposiotry } from "../../repositories/IUsersRepository";

export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersReposiotry
    ) {}

    async execute({
        name,
        username,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        await this.usersRepository.create({
            name,
            username,
            email,
            password,
            driver_license,
        });
    }
}
