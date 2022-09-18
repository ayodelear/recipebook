import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') toggle: boolean = false;

    constructor(private elRef: ElementRef){
    }

    @HostListener('document:click', ['$event']) onClick(eventData: Event){
        this.toggle = this.elRef.nativeElement.contains(eventData.target) ? !this.toggle : false; 
    }
}