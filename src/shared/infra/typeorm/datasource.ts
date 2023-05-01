import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",

    host: "localhost",

    username: "postgres",

    password: "postgres",

    database: "aula02",

    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],

    entities: ["./src/modules/**/entities/*.{ts,js}"],
});

export const createConnection = (host = "database"): Promise<DataSource> => {
    return AppDataSource.setOptions({
        host: process.env.NODE_ENV === "test" ? "localhost" : host,
        database:
            process.env.NODE_ENV === "test"
                ? "aula02_test"
                : AppDataSource.options.database.toString(),
    }).initialize();
};

export default AppDataSource;
