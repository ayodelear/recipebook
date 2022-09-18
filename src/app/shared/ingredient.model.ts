import { Appsettings } from "./appsettings";

export class Ingredient{ 
    constructor(public name: string,
                public amount: number,
                public unit: string = Appsettings.Measurements.None){
    }
}