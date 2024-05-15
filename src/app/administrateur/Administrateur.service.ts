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

    // Home - récupérer les infos pour la Home page
    home(): Observable<any> {
        return this.http.get<any>(environnement.baseUrl + environnement.baseAdministrateur + "/home");
    }

    // Liste des étudiants
    getEtudiants(): Observable<any> {
        return this.http.get(environnement.baseUrl + environnement.baseEtudiant);
    }

    // Liste des professeurs
    getProfesseurs(): Observable<any> {
        return this.http.get(environnement.baseUrl + environnement.baseProfesseur);
    }

    // Modification d'un étudiant
    updateEtudiant(etudiant: any, _id: string): Observable<any> {
        return this.http.put(environnement.baseUrl + environnement.baseEtudiant + '/' + _id, etudiant);
    }

    // Modification d'un professeur
    updateProfesseur(professeur: any, _id: string): Observable<any> {
        return this.http.put(environnement.baseUrl + environnement.baseProfesseur + '/' + _id, professeur);
    }

}