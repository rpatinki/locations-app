export class Category {
    name: string;
    locations: Location [];
    id: number;

    constructor(name: string, id: number, locations?: Location[]) {
        this.id = id;
        this.name = name;
        locations ? this.locations = locations : this.locations = [];
    }
}
