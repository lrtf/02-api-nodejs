import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "./ListCarsUseCase";

export class ListCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { category_id, brand, name } = request.body;
        const listCarsUseCase = container.resolve(ListCarsUseCase);

        const cars = await listCarsUseCase.execute({
            category_id,
            brand,
            name,
        });

        return response.status(200).send(cars);
    }
}
