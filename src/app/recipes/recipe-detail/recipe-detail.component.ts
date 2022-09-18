import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  selectedRecipe: Recipe;
  selectedId: number;
  subscription: Subscription;
  
  constructor(private shoppingListService: ShoppingListService,
              private recipesService: RecipesService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  
  }

  ngOnInit(): void {
    this.setSelectedRecipe();     

    this.subscription = this.route.params.subscribe(params => {
      this.setSelectedRecipe();
    });
  }

  addToShoppingList(): void{
    this.shoppingListService.addNewIngredients(this.selectedRecipe.ingredients);
  }

  private setSelectedRecipe() {
    this.selectedId = +this.route.snapshot.params['id'];
    let tempRecipe = this.recipesService.getRecipe(this.selectedId)
    
    if (tempRecipe !== null)
      this.selectedRecipe = tempRecipe;
  }

  onDelete(){
    this.recipesService.deleteRecipe(this.selectedId);
    this.router.navigate(['recipes'])
  }

}
