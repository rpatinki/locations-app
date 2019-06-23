import { Location } from './location';

export class Category {
    name: string;
    locations: number [];
    id: number;

    constructor(name: string, id: number, locations?: number[]) {
        this.id = id;
        this.name = name;
        this.locations = [];
    }
}
