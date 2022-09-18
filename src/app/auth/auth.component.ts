import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./services/auth.service";
import { DynamicAlertComponent } from "../shared/dynamic-alert/dynamic-alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string;
    authServiceTask: Subscription;
    @ViewChild(PlaceholderDirective) dynamicAlertHost: PlaceholderDirective;
    @ViewChild('form') form : NgForm;
    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {        
    }

    ngOnDestroy(): void {
        this.authServiceTask.unsubscribe();
        if (this.closeSub){
            this.closeSub.unsubscribe();
        }    
    };

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(){
        this.error = null;
        if(!this.form.valid){
            return;
        }

        let authObser:  Observable<AuthResponseData>;

        this.isLoading = true;
        if (!this.isLoginMode){
            authObser =
                this.authService.signUp( this.form.value.email, this.form.value.password);
        } else{
            authObser =
                this.authService.signIn( this.form.value.email, this.form.value.password);
        }

        this.authServiceTask =
            authObser
                .subscribe({
                    next: (response) => {
                        console.log(response);
                        this.isLoading = false;
                        this.router.navigate(['recipes']);
                    },
                    error: (error) => {
                        this.error = error;
                        this.showErrorAlert(error);
                        this.isLoading = false;
                    }
                });

        this.form.reset();
    }

    onHandlerClose(){
        this.error = null;
    }

    private showErrorAlert(error: string){
        const hostViewContainerRef = this.dynamicAlertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(DynamicAlertComponent);
        componentRef.instance.message = error;
        this.closeSub = componentRef.instance.close.subscribe(() =>{
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }
}