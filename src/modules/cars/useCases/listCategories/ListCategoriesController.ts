import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const liistCategoriesUseCase = container.resolve(ListCategoriesUseCase);

        const all = await liistCategoriesUseCase.execute();

        return response.status(200).json(all);
    }
}
