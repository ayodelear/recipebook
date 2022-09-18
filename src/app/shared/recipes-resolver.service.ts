import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../services/data-storage.service";
import { Recipe } from "../recipes/recipe.model";
import { Observable } from "rxjs";
import { RecipesService } from "../services/recipes.service";

@Injectable({'providedIn':'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService, private recipesService: RecipesService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        var recipes = this.recipesService.getRecipes();
        return recipes.length <= 0
            ? this.dataStorageService.getRecipes()
            :recipes;

    }
}