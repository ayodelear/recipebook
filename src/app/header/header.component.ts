import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSubscription: Subscription;
    isUserAuthenticated = false;

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService){       
    }
    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.userSubscription =
            this.authService.user.subscribe(user => {
                this.isUserAuthenticated = !!user; 
            });
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
        this.dataStorageService.storeIngredients();
    }

    onFetchData() {
        this.dataStorageService.getRecipes().subscribe();
        this.dataStorageService.getIngredients().subscribe();
    }

    logout(){
        this.authService.logout();
    }
}