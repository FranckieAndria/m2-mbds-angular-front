import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from 'environnement/environnement';
import { Credentials } from './credentials.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedIn = false;
    constructor(private http: HttpClient) { }

    login(credentials: Credentials, typeUser: string): Observable<any> {
        return this.http.post(this.getLoginApiUrl(typeUser), credentials);
    }

    getLoginApiUrl(typeUser: string): string {
        return environnement.baseUrl + '/' + typeUser + '/login' ;
    }

    isAdmin() {
        const promesse = new Promise((resolve, reject) => {
            resolve(this.loggedIn);
        });
        return promesse;
    }
}
