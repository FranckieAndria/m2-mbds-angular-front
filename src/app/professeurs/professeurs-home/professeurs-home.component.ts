import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { PreloaderService } from 'app/shared/preload.service';
import { ProfesseurService } from '../professeurs.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-professeurs-home',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './professeurs-home.component.html',
  styleUrls: ['./professeurs-home.component.css']
})
export class ProfesseursHomeComponent implements OnInit {

  nom: string = "";
  prenom: string = "";
  email: string = "";
  matiere: string = "";
  matiereImage: string = "";

  total: number = 0;
  rendu: number = 0;
  non_rendu: number = 0;

  constructor(private preloader: PreloaderService, private professeurService: ProfesseurService) { }

  ngOnInit() {
    this.loadApropos();
  }

  loadApropos() {
    this.professeurService.home().subscribe((data) => {
      const professeur = data.professeur[0];
      this.nom = professeur.nom || "";
      this.prenom = professeur.prenom || "";
      this.email = professeur.email || "";
      this.matiere = professeur.matiere.intitule || "";
      this.matiereImage = professeur.matiere.imagePath || "";

      this.total = data.total || 0;
      this.rendu = data.rendu || 0;
      this.non_rendu = data.non_rendu || 0;
      this.preloader.hide();
    });
  }

}
