import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environnement } from "environnement/environnement";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AdministrateurService {

    constructor(private http: HttpClient) { }

    // Check Admin rôle
    checker(): Observable<any> {
        return this.http.get(environnement.baseUrl + environnement.baseAdministrateur + '/checker');
    }

    // Liste des étudiants
    getEtudiants(): Observable<any> {
        return this.http.get(environnement.baseUrl + environnement.baseEtudiant);
    }

    // Liste des professeurs
    getProfesseurs(): Observable<any> {
        return this.http.get(environnement.baseUrl + environnement.baseProfesseur);
    }

    // Modification d'un professeur
    updateProfesseur(professeur: any, _id: string): Observable<any> {
        return this.http.put(environnement.baseUrl + environnement.baseProfesseur + '/' + _id, professeur);
    }

}