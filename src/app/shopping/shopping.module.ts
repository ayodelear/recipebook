import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuard } from '../services/auth-guard.service';
import { IngredientsResolverService } from '../shared/ingredients-resolver.service';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(
        [{path: '', component: ShoppingListComponent, canActivate:[AuthGuard],
         resolve:[IngredientsResolverService]}]
    )
  ]
})
export class ShoppingModule { }
