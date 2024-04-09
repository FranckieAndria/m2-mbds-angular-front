import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { environnement } from 'environnement/environnement';
import { Assignment } from './models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments: Assignment[] = [];

  constructor(private logService: LoggingService, private http: HttpClient) { }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(environnement.baseUrl);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(environnement.baseUrl + "/" + id)
      .pipe(
        catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
      );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  addAssignment(assignment: Assignment): Observable<any> {
    this.logService.log(assignment.titre, "ajouté");
    return this.http.post<Assignment>(environnement.baseUrl, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.logService.log(assignment.titre, "modifié");
    return this.http.put<Assignment>(environnement.baseUrl, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.logService.log(assignment.titre, "supprimé");
    return this.http.delete(environnement.baseUrl + "/" + assignment._id);
  }

}
