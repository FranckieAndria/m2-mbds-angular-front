import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Injectable(

)
export class TokenInterceptor implements HttpInterceptor {

    constructor(@Inject(DOCUMENT) private document: Document, private route: Router) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.route.navigate(['/login']);
            return of(err.message);
        }
        return throwError(err);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('/login')) return next.handle(request);
        const localStorage = this.document.defaultView?.localStorage;
        if (localStorage) {
            const token = localStorage.getItem('token');
            if (token) request = request.clone({ setHeaders: {'x-access-token': token} });
        }
        return next.handle(request).pipe(catchError(response => this.handleAuthError(response)));
    }
}