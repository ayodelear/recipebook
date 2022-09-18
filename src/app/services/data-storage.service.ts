import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { RecipesService } from "./recipes.service";
import { ShoppingListService } from "./shopping-list.service";

@Injectable({'providedIn':'root'})
export class DataStorageService{
    private apiEndpoint = 'https://recipe-book-9e5da-default-rtdb.europe-west1.firebasedatabase.app/';
    private recipesPath = 'recipes.json'
    private ingredientsPath = 'ingredients.json';

    constructor(private httpClient: HttpClient,
                private recipesService: RecipesService,
                private shoppingListService: ShoppingListService){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        this.httpClient.put(`${this.apiEndpoint}${this.recipesPath}`, recipes)
            .subscribe({
                next: (response) => {
                    console.log(response);
                },
                error: (error) => {
                    console.log(error);
                },
                complete: () => {
                    console.log('Completed');
                }
            });
    }

    storeIngredients(){
        const ingredients = this.shoppingListService.getIngredients();
        this.httpClient
            .put(`${this.apiEndpoint}${this.ingredientsPath}`, ingredients)
            .subscribe({
                next: (response) => {console.log(response)},
                error: (error) => {console.error(error)},
                complete: () => {console.info('complete')} 
            });
    }    

    getRecipes(){
        return this.httpClient.get<Recipe[]>(`${this.apiEndpoint}${this.recipesPath}`)
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                    })
                }),
                tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                }));
    }

    getIngredients(){
        return this.httpClient.get<Ingredient[]>(`${this.apiEndpoint}${this.ingredientsPath}`)
            .pipe(
                map(ingredients => {
                    return ingredients.map(ingredient => {
                        return {...ingredient}
                    })
                }),
                tap(ingredients => {
                    this.shoppingListService.setIngredients(ingredients);
                }))
    }
}

    /*getRecipes(){
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.httpClient.get<Recipe[]>(
                'https://recipe-book-9e5da-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                {
                    params: new HttpParams().set('auth', user.token)
                });
        }),map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
        }),
        tap(recipes => {
            this.recipesService.setRecipes(recipes);
        }));
    }*/