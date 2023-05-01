import request from "supertest";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm/datasource";

describe("Create Category Controller", () => {
    beforeAll(async () => {
        const connection = await createConnection("test");
        await connection.runMigrations();
    });
    it("should be able to create a new category ", async () => {
        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest",
        });

        expect(response.status).toBe(201);
    });
});
