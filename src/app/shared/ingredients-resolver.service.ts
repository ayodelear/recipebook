import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../services/data-storage.service";
import { Observable } from "rxjs";
import { Ingredient } from "./ingredient.model";
import { ShoppingListService } from "../services/shopping-list.service";

@Injectable({'providedIn':'root'})
export class IngredientsResolverService implements Resolve<Ingredient[]>{
    constructor(private dataStorageService: DataStorageService, private shoppingListService: ShoppingListService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Ingredient[] | Observable<Ingredient[]> | Promise<Ingredient[]> {
        var ingredients = this.shoppingListService.getIngredients();
        return ingredients.length <= 0
            ? this.dataStorageService.getIngredients()
            : ingredients;

    }
}