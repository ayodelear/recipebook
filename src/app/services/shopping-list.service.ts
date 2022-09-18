import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Appsettings } from "../shared/appsettings";
import { Ingredient } from "../shared/ingredient.model";
import { HttpClient } from "@angular/common/http";

@Injectable({'providedIn':'root'})
export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<number>();
    /*private ingredients: Ingredient[] = [
        new Ingredient('Onion', 4),
        new Ingredient('Tomato', 5),
        new Ingredient('Rice', 5, Appsettings.Measurements.Kilograms)
      ];*/

    private ingredients: Ingredient[] = [];  
    constructor(private httpClient: HttpClient){}

    setIngredients(ingredients){
        this.ingredients = ingredients;
        this.getIngredients();
    }
      
    getIngredients() {
        return this.ingredients.slice();
    } 

    getIngredient(index:number): Ingredient {
        return this.ingredients[index];
    } 

    removeIngredient(index:number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    } 
    
    onIngredientSelected(index) {
        this.ingredientSelected.next(index);
    } 

    addNewIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addNewIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}