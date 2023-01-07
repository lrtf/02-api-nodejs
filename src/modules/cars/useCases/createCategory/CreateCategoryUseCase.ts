import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import {inject, injectable} from "tsyringe";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private readonly categoriesRepository: ICategoriesRepository
        ) {}

   async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists: Category = await
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category Already exists!");
        }
        this.categoriesRepository.create({ name, description });
    }

    

  
}
