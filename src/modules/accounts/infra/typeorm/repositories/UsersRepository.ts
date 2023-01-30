import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersReposiotry } from "@modules/accounts/repositories/IUsersRepository";
import AppDataSource from "@shared/infra/typeorm/datasource";

import { User } from "../entities/User";

export class UsersRepository implements IUsersReposiotry {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async create({
        id,
        name,
        email,
        driver_license,
        password,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            id,
            name,
            email,
            driver_license,
            password,
            avatar,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                email,
            },
        });

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                id,
            },
        });

        return user;
    }
}
