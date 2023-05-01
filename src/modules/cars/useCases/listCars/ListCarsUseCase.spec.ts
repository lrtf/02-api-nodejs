import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "any_car",
            description: "any_car is perfect",
            daily_rate: 140.0,
            license_plate: "ANY-0A00",
            fine_amount: 100,
            brand: "any",
            category_id: "any_category_id",
        });
        const cars = await listCarsUseCase.execute({
            brand: null,
            category_id: null,
            name: null,
        });
        console.log("Cars", cars);

        expect(cars).toEqual([car]);
    });
});
