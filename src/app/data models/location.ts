import { Category } from './category';
export class Location {
    name: string;
    latitude: number;
    longtitue: number;
    address: string;
    category: Category;
    id: number;
    
    constructor(name: string,
        latitude: number,
        longtitue: number,
        address: string,
        category: Category,
        id: number){
            this.name = name;
            this.latitude = latitude;
            this.longtitue = longtitue;
            this.address = address;
            this.category = category;
            this.id = id;
        }
}
