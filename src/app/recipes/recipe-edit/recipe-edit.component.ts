import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';
import { Appsettings } from 'src/app/shared/appsettings';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  isEditMode: boolean;
  subscription: Subscription;
  recipeForm: FormGroup
  measurementUnits: string[];

  constructor(private router: Router, private route: ActivatedRoute, private recipesService: RecipesService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  ngOnInit(): void {
    this.measurementUnits = Appsettings.Measurements.units;
    this.subscription =
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.isEditMode = params['id'] !== null && params['id'] !== undefined;
        this.initForm()
      }); 

      this.initForm();
  }

  initForm(){
    let recipe = this.isEditMode ? this.recipesService.getRecipe(this.id) : null;

    var ingredients = new FormArray<FormGroup>([])

    recipe?.ingredients?.forEach(element => {
      ingredients.push(new FormGroup({
        'name': new FormControl(element.name, Validators.required),
        'amount': new FormControl(element.amount, Validators.required),
        'unit': new FormControl(element.unit)
      }))
    });

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe?.name, Validators.required),
      'imagePath': new FormControl(recipe?.imagePath, Validators.required),
      'description': new FormControl(recipe?.description, Validators.required),
      'ingredients': ingredients
    })
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required),
      'unit': new FormControl(null)
    }))
  }

  onRemoveIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).controls.splice(index, 1);
  }

  onSubmit(){
    if(!this.isEditMode){
      let ingredients: Ingredient[] = [];
      (<FormArray>this.recipeForm.get('ingredients')).controls.forEach((element: FormGroup)=> {
        ingredients.push(
          new Ingredient(element.get('name').value,
                        element.get('amount').value,
                        element.get('unit').value));
      });

      let recipe = new Recipe(
        //Or this.recipeForm.value['name']
        this.recipeForm.get('name').value,
        this.recipeForm.get('description').value,
        this.recipeForm.get('imagePath').value,
        ingredients
      );

      this.recipesService.addRecipe(recipe);
      this.recipeForm.reset();
    }else{
      let recipe = this.recipesService.getRecipe(this.id);
      recipe.name = this.recipeForm.get('name').value;
      recipe.description = this.recipeForm.get('description').value;
      recipe.imagePath = this.recipeForm.get('imagePath').value;

      let ingredients: Ingredient[] = [];
      (<FormArray>this.recipeForm.get('ingredients')).controls.forEach((element: FormGroup)=> {
        ingredients.push(
          new Ingredient(element.get('name').value,
                        element.get('amount').value,
                        element.get('unit').value));
      });

      recipe.ingredients = ingredients;
      this.router.navigate(['recipes', this.id]);
    }
  }

  onReset(){
    if (this.isEditMode){
      this.router.navigate(['recipes', this.id]);
    }
    else{
      this.router.navigate(['recipes']);
    }
  }

  onClearIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).controls = [];
  }
}


