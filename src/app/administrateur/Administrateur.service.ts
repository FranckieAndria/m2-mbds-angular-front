import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environnement } from "environnement/environnement";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AdministrateurService {

    constructor(private http: HttpClient) { }

    // Liste des professeurs
    getProfesseurs(): Observable<any> {
        return this.http.get(environnement.baseUrl + environnement.baseProfesseur + '/matieres');
    }

    // Modification d'un professeur
    updateProfesseur(professeur: any, _id: string): Observable<any> {
        return this.http.put(environnement.baseUrl + environnement.baseProfesseur + '/' + _id, professeur);
    }

}