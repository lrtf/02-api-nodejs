import { Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import AppDataSource from "@shared/infra/typeorm/datasource";

import { UsersTokens } from "../entities/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UsersTokens>;

    constructor() {
        this.repository = AppDataSource.getRepository(UsersTokens);
    }
    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UsersTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });
        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        token: string
    ): Promise<UsersTokens> {
        const userToken = await this.repository.findOne({
            where: {
                user_id,
                refresh_token: token,
            },
        });

        return userToken;
    }

    async deleteById(id_user: string): Promise<void> {
        await this.repository.delete({ id: id_user });
    }
}
