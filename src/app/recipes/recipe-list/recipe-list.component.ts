import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RecipesService } from "src/app/services/recipes.service";
import { Recipe } from "../recipe.model";

@Component({
    selector: 'app-recipe-list',
    templateUrl: 'recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[] = [];
  recipesSub: Subscription;

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute){      
  }
  ngOnDestroy(): void {
    this.recipesSub.unsubscribe();
  }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();

    this.recipesSub =
      this.recipesService.recipesListChanged.subscribe((recipes: Recipe[]) =>
      {
        this.recipes = recipes;
      })
  }

  onNewRecipeClick(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}