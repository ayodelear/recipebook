import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { PagenotfoundComponent } from "../pagenotfound/pagenotfound.component";
import { AuthInterceptorService } from "../auth/services/auth-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

const routes: Routes = [
    {path:'recipes', loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule)},
    {path:'shopping-list', loadChildren: () => import('../shopping/shopping.module').then(m => m.ShoppingModule)},
    {path:'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: '**', component: PagenotfoundComponent}
]
@NgModule({
  //imports: [ RouterModule.forRoot(routes)],
  imports: [ RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [ RouterModule ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
})
export class AppRoutingModule{
}