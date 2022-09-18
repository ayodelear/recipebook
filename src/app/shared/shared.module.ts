import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { DynamicAlertComponent } from './dynamic-alert/dynamic-alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder.directive';


@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    DynamicAlertComponent,
    PlaceholderDirective    
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    DynamicAlertComponent,
    PlaceholderDirective
  ]
})
export class SharedModule { }
