import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environnement } from 'environnement/environnement';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http: HttpClient) { }

  getAssignment(_id: string): Observable<any> {
    return this.http.get<any>(environnement.baseUrl + environnement.baseAssignment + "/" + _id) ;
  }

}
