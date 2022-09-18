import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
    private defaultErrorMessage = 'An error occurred!';
    private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`;
    private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`;
    private userLocalStorageKey = 'userData';
    private tokenExpirationTimer: any;
    user = new BehaviorSubject<User>(null);
    
    constructor(private http: HttpClient, private router: Router){}

    signUp(email:string, password: string){     
        return this.http.post<AuthResponseData>(this.signUpUrl,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.signUpErrorHandler.bind(this)), tap(this.createUser.bind(this)))
    }

    signIn(email:string, password: string){
        return this.http.post<AuthResponseData>(this.signInUrl,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.signInErrorHandler.bind(this)), tap(this.createUser.bind(this)))
    }

    autoLogOut(expirationDuration: number){
        this.tokenExpirationTimer =
            setTimeout(() => {this.logout();}, expirationDuration);
    }

    autoLogin(){
        const userData: {
            email: string,
            id:string,
            _token: string,
            _tokenExpirationDate: Date
        } = JSON.parse(localStorage.getItem(this.userLocalStorageKey));

        if(!userData){
            return;
        }

        const expirationDate = new Date(userData._tokenExpirationDate);
        const loadedUser = 
            new User(userData.email,
                     userData.id,
                     userData._token,
                     expirationDate);

        if (loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = expirationDate.getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['auth']);
        localStorage.removeItem(this.userLocalStorageKey);
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    private createUser(responseData: AuthResponseData) {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
        const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
        this.user.next(user);
        this.autoLogOut(+responseData.expiresIn * 1000);
        localStorage.setItem(this.userLocalStorageKey, JSON.stringify(user));
    }

    private signUpErrorHandler(errorResponse) {
        let errorMessage = this.defaultErrorMessage;
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(() => new Error(errorMessage));
        }

        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email exists already";
        }

        return throwError(() => new Error(errorMessage));
    }
    
    private signInErrorHandler(errorResponse) {
        let errorMessage = this.defaultErrorMessage;
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(() => new Error(errorMessage));
        }

        switch(errorResponse.error.error.message){
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_PASSWORD':
                errorMessage = " This credentials are not valid";
                break;
            case 'USER_DISABLED':
                errorMessage = " This user is disabled";
                break;    
        }

        return throwError(() => new Error(errorMessage));
    }
}