import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environnement } from "environnement/environnement";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProfesseurService {

    constructor(private http: HttpClient) { }

    // Liste des étudiants du professeur
    getEtudiants(): Observable<any> {
        return this.http.get<any>(environnement.baseUrl + environnement.baseProfesseur + "/etudiants");
    }

}