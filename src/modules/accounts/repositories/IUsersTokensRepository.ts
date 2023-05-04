import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUsersTokensRepository {
    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UsersTokens>;

    findByUserIdAndRefreshToken(
        user_id: string,
        token: string
    ): Promise<UsersTokens>;

    deleteById(id_user: string): Promise<void>;
}
