import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Appsettings } from "../shared/appsettings";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({'providedIn':'root'})
export class RecipesService{
  recipesListChanged = new Subject<Recipe[]>();
  /*private recipes: Recipe[] = [
      new Recipe('Prawn Fried Rice',
        'A favorite from China',
        'https://chineserecipesforall.com/images/uploads/recipes/king-prawn-fried-rice-recipe-RecipeMain-Chinese-Recipes-For-All.jpg',
        [
          new Ingredient('Rice', 2, Appsettings.Measurements.Kilograms),
          new Ingredient('Prawns', 30, Appsettings.Measurements.Pieces),
          new Ingredient('Oil', 3, Appsettings.Measurements.Litres),
        ]),
      new Recipe('Jollof Rice',
        'A favorite from West Africa',
        'https://media-cdn.greatbritishchefs.com/media/ckajxclx/img82551.jpg?mode=crop&width=1536&height=1024',
        [
          new Ingredient('Rice', 2, Appsettings.Measurements.Kilograms),
          new Ingredient('Oil', 1, Appsettings.Measurements.Litres),
        ]),
      new Recipe('Katsu Curry Rice',
          'A favorite from Japan',
          'https://cdn.media.amplience.net/i/japancentre/recipes-301-japanese-chicken-katsu-curry/recipes-301-japanese-chicken-katsu-curry?$poi$&w=1400&sm=aspect&aspect=16:9&fmt=auto',
          [
            new Ingredient('Rice', 2, Appsettings.Measurements.Kilograms),
            new Ingredient('Oil', 3, Appsettings.Measurements.Litres),
            new Ingredient('Chicken', 2, Appsettings.Measurements.Kilograms),
          ])
    ];*/
    
    private recipes: Recipe[] = [];
    
    setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesListChanged.next(this.getRecipes());
    }

    getRecipes(){
        return this.recipes.slice();        
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesListChanged.next(this.getRecipes())
    }

    deleteRecipe(selectedId: number) {
      this.recipes.splice(selectedId,1);
      this.recipesListChanged.next(this.getRecipes())
    }

    getRecipe(id:number){
      if (id > -1 && this.recipes.length > id)
        return this.recipes[id];
      else
        return null;
    }
}