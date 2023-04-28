import { v4 as uuidV4 } from "uuid";

export class Car {
    id: string;
    name: string;
    description: string;
    daily_rate: number;
    avaliable: boolean;
    licence_plate: string;
    fine_amount: number;
    brand: string;
    created_at: Date;
    category_id: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.avaliable = true;
            this.created_at = new Date();
        }
    }
}
