import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Subject, tap, throwError, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { EmailService } from "../shared/email.service";
import { User } from "./user.model";

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    token: string = null;
    tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router) {

    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ 'AIzaSyDjsajmY47Zo7rXI9xEVVBpmUiJjsebNrg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn)
            }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate));

        if (loadedUser.getToken) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime();
             - new Date().getTime();
             console.log(expirationDuration);
             
            this.autoLogout(expirationDuration);
        }
    }

    getUser() {
        console.log(this.user.value.email);


    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + 'AIzaSyDjsajmY47Zo7rXI9xEVVBpmUiJjsebNrg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError));
    }

    private handleAuthentication(email: string, userID: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + + expiresIn * 1000);
        const user = new User(
            email,
            userID,
            token,
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An uknown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXIST':
                errorMessage = 'This email exist already';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Operation not allowed'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email not found'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid password'
                break;
            case 'USER_DISABLED':
                errorMessage = 'This user was disabled'
                break;
        }
        return throwError(errorMessage);


    }
}