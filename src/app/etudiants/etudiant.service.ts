import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from 'app/shared/models/assignment.model';
import { AssignmentSave } from 'app/shared/models/assignment.save.model';
import { Matiere } from 'app/shared/models/matiere.model';
import { Score } from 'app/shared/models/score.model';
import { environnement } from 'environnement/environnement';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  assignments: Assignment[] = [];

  constructor(private http: HttpClient) { }

  // Récupération des infos de l'Home page - Stats
  getHomeInfoStats(): Observable<any> {
    return this.http.get<any>(environnement.baseUrl + environnement.baseEtudiant + "/homestats");
  }

  // Récupération des infos de l'Home page
  getHomeInfo(): Observable<any> {
    return this.http.get<any>(environnement.baseUrl + environnement.baseEtudiant + "/home");
  }

  // Recherche d'assignment
  search(titre: string, matiere: string, dateDeCreationInf: string, dateDeCreationSup: string, dateDeRenduInf: string, dateDeRenduSup: string, rendu: number, page: number, limit: number): Observable<any> {
    const url = environnement.baseUrl + environnement.baseEtudiant + "/assignments/search" + this.createSearchQueryParameter(titre, matiere, dateDeCreationInf, dateDeCreationSup, dateDeRenduInf, dateDeRenduSup, rendu, page, limit) ;
    return this.http.get(url);
  }

  createSearchQueryParameter(titre: string, matiere: string, dateDeCreationInf: string, dateDeCreationSup: string, dateDeRenduInf: string, dateDeRenduSup: string, rendu: number, page:number, limit: number): string {
    let parameters = "?titre=" + encodeURI(titre) + "&matiere=" + encodeURI(matiere) + "&page=" + page + "&limit=" + limit ;
    if (dateDeCreationInf && dateDeCreationInf != "") parameters += "&dateDeCreationInf=" + dateDeCreationInf;
    if (dateDeCreationSup && dateDeCreationSup != "") parameters += "&dateDeCreationSup=" + dateDeCreationSup;
    if (dateDeRenduInf && dateDeRenduInf != "") parameters += "&dateDeRenduInf=" + dateDeRenduInf;
    if (dateDeRenduSup && dateDeRenduSup != "") parameters += "&dateDeRenduSup=" + dateDeRenduSup;
    if (rendu && rendu != 0) parameters += "&rendu=" + rendu ;
    return parameters;
  }

  // Récupération du report PDF
  getReport(studentInfo: any): void {
    const url = environnement.baseUrl + environnement.baseEtudiant + "/report" + this.createReportQueryParameter(studentInfo);
    this.http.get(url, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  createReportQueryParameter(studentInfo: any): string {
    let parameters = "?";
    parameters += "nom=" + studentInfo.nom ;
    parameters += "&prenom=" + studentInfo.prenom ;
    parameters += "&email=" + studentInfo.email ;
    parameters += "&niveau=" + studentInfo.niveau ;
    return parameters;
  }

  // Enregistrement d'un assignment
  saveAssignment(assignment: AssignmentSave): Observable<any> {
    return this.http.post(environnement.baseUrl + environnement.baseEtudiant + "/assignment", assignment);
  }

  // Récupération des assignments paginés
  getAssignmentsPagines(page: number, limit: number, statut: number, tri: number): Observable<any> {
    return this.http.get<Assignment[]>(environnement.baseUrl + environnement.baseEtudiant + "/assignments?page=" + page + "&limit=" + limit + "&rendu=" + statut + "&tri=" + tri);
  }

  // Récupération de la liste des matières pour les listes déroulantes
  getMatieres(): Observable<any> {
    return this.http.get<Matiere[]>(environnement.baseUrl + environnement.baseProfesseur + "/matieres");
  }

  // Récupération des releve des notes des assignments rendu
  getScores(): Observable<any> {
    return this.http.get<Score[]>(environnement.baseUrl + environnement.baseEtudiant + "/releve");
  }

}