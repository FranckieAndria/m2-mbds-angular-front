import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environnement } from "environnement/environnement";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProfesseurService {

    constructor(private http: HttpClient) { }

    // Noter - rendre un assignment
    noterRendre(id: string, rendu: boolean, note: number, remarque: string) {
        const url = environnement.baseUrl + environnement.baseAssignment + '/' + id;
        const body = {
            rendu: rendu,
            note: note,
            remarque: remarque
        };
        return this.http.put(url, body);
    }

    // Recherche
    details(titre: string, etudiant: string, rendu: number, page:number, limit: number): Observable<any> {
        const url = environnement.baseUrl + environnement.baseProfesseur + "/assignments/details" + this.createSearchQueryParameter(titre, etudiant, rendu, page, limit);
        return this.http.get<any>(url);
    }

    createSearchQueryParameter(titre: string, etudiant: string, rendu: number, page:number, limit: number): string {
        let parameters = "?titre=" + encodeURI(titre) + "&page=" + page + "&limit=" + limit ;
        if (etudiant && etudiant != "") parameters += "&etudiant=" + etudiant ;
        if (rendu && rendu != 0) parameters += "&rendu=" + rendu ;
        return parameters;
      }

    // Liste des étudiants du professeur
    getEtudiants(page: number, limit: number): Observable<any> {
        const url = environnement.baseUrl + environnement.baseProfesseur + "/etudiants" + this.createEtudiantsQueryParameter(page, limit) ;
        return this.http.get<any>(url);
    }

    createEtudiantsQueryParameter(page: number, limit: number): string {
        let parameters = "?page=" + page + "&limit=" + limit;
        return parameters;
    }

}