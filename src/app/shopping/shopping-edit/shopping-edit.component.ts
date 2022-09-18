import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Appsettings } from 'src/app/shared/appsettings';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm') form: NgForm;
  measurementUnits: string[];
  defaultUnit = Appsettings.Measurements.Kilograms;
  selectedIndex = -1;
  ingredientSelected: Subscription;
  constructor(private shoppingListService: ShoppingListService) {
  }
  ngOnDestroy(): void {
    this.ingredientSelected.unsubscribe();
  }

  ngOnInit(): void {
    this.measurementUnits = Appsettings.Measurements.units;
    this.ingredientSelected =
      this.shoppingListService.ingredientSelected.subscribe((index: number) =>{
        this.selectedIndex = index;
        let ingredient = this.shoppingListService.getIngredient(index);

        this.form.form.setValue({
          'name': ingredient.name,
          'amount': ingredient.amount,
          'units': ingredient.unit
        });
      })    
  }

  onAddOrUpdate() {
    if(this.selectedIndex > -1){
      let ingredient = this.shoppingListService.getIngredient(this.selectedIndex);
      ingredient.name = this.form.value.name;
      ingredient.amount = this.form.value.amount;
      ingredient.unit = this.form.value.unit;
      this.selectedIndex = -1;
    }
    else{
      this.shoppingListService
        .addNewIngredient(
          new Ingredient(
            this.form.value.name,
            +this.form.value.amount,
            this.form.value.units));
    }

    this.reset();
  }

  onDelete() {
    if(this.selectedIndex <= -1)
      return;

    this.shoppingListService.removeIngredient(this.selectedIndex);
    this.selectedIndex = -1;

    this.reset();
  }

  reset() {
    this.selectedIndex = -1;
    this.form.reset();
    this.form.form.patchValue({
      'units': this.defaultUnit
    });
  }
}
