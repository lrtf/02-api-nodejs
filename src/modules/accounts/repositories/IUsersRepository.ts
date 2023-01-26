import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUsersReposiotry {
    create(data: ICreateUserDTO): Promise<void>;
}
