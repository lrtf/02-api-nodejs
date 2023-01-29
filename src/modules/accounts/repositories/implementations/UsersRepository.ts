import { Repository } from "typeorm";

import AppDataSource from "../../../../../ormconfig";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersReposiotry } from "../IUsersRepository";

export class UsersRepository implements IUsersReposiotry {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async create({
        name,
        email,
        driver_license,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
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
}
