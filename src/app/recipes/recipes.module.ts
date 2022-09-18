import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeDetailsStartComponent } from './recipe-details-start/recipe-details-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { RecipesResolverService } from '../shared/recipes-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../services/auth-guard.service';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeDetailsStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(
      [ {path: '', component: RecipesComponent, canActivate:[AuthGuard], 
      resolve: [RecipesResolverService], children:[
        {path: '', component: RecipeDetailsStartComponent},
        {path: 'new', component:RecipeEditComponent},        
        {path: ':id', component:RecipeDetailComponent},
        {path: ':id/edit', component:RecipeEditComponent},
    ]}]
    )
  ]
})
export class RecipesModule { }
