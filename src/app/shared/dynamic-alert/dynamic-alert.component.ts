import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'dynamic-app-alert',
    templateUrl:'./dynamic-alert.component.html',
    styleUrls: ['./dynamic-alert.component.css']
})
export class DynamicAlertComponent{
    @Input() message:string;
    @Output() close = new EventEmitter<void>();

    onClose(){
        this.close.emit();
    }

}