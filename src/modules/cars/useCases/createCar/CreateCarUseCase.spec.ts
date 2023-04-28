import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
    });
    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "any_name",
            description: "any_description",
            daily_rate: 0,
            license_plate: "any_plate",
            fine_amount: 0,
            brand: "any_brand",
            category_id: "any_id_category",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "any_name1",
                description: "any_description",
                daily_rate: 0,
                license_plate: "any_plate",
                fine_amount: 0,
                brand: "any_brand",
                category_id: "any_id_category",
            });
            await createCarUseCase.execute({
                name: "any_name2",
                description: "any_description",
                daily_rate: 0,
                license_plate: "any_plate",
                fine_amount: 0,
                brand: "any_brand",
                category_id: "any_id_category",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "any_name1_available",
            description: "any_description",
            daily_rate: 0,
            license_plate: "any_plate",
            fine_amount: 0,
            brand: "any_brand",
            category_id: "any_id_category",
        });

        expect(car.avaliable).toBe(true);
    });
});
