import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { FilterPipe } from 'app/filter.pipe';
import { PreloaderService } from 'app/shared/preload.service';
import { ProfesseurService } from '../professeurs.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentRenduComponent } from 'app/shared/assignment-rendu/assignment-rendu.component';

@Component({
  selector: 'app-professeurs-etudiants',
  standalone: true,
  imports: [
    FilterPipe,
    CommonModule,
    MatPaginatorModule,
    FilterPipe,
    MatCardModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './professeurs-etudiants.component.html',
  styleUrls: ['./professeurs-etudiants.component.css']
})
export class ProfesseursEtudiantsComponent implements OnInit {

  /************************************
  * FIELDS pour la pagination - START *
  ************************************/
  page = 0;
  limit = 30;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  /**********************************
  * FIELDS pour la pagination - END *
  **********************************/

  // Liste des étudiants du professeur
  etudiants: any ;
  searchText: any;

  // Détails d'un étudiant
  idEtudiantDetails: string = '';
  isDetails = false;
  details: any;

  constructor(
    private professeurService: ProfesseurService, 
    private preloader: PreloaderService,
    public dialog: MatDialog  
  ) { }

  ngOnInit() {
    this.getEtudiants();
  }

  // Rendre | noter un assignment
  rendreNoter(assign: any, rendre: boolean, remarque: boolean) {
    const rendreDialog = this.dialog.open(AssignmentRenduComponent, {
      data: {
        assign: assign,
        rendre: rendre,
        remarque: remarque
      },
    });

    rendreDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.detailsEtudiant(this.idEtudiantDetails);
      }
    });
  }

  // Revenir à la liste
  revenirListe() {
    this.getEtudiants();
    this.isDetails = false ;
    this.details = undefined ;
  }

  // Liste des étudiants du professeur
  getEtudiants() {
    this.professeurService.getEtudiants(this.page, this.limit).subscribe((data) => {
      this.etudiants = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
      this.preloader.hide();
    }) ;
  }

  // Détails des assignments pour un étudiant du professeur
  detailsEtudiant(etudiant: string) {
    this.isDetails = true;
    this.professeurService.details('', etudiant, 0, 1, 100).subscribe((data) => {
      this.idEtudiantDetails = etudiant;
      this.details = data.docs;
    })
  }


  /*********************
   * PAGINATION - START *
   *********************/
  pagePrecedente() {
    this.page = this.prevPage;
    this.getEtudiants();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getEtudiants();
  }

  premierePage() {
    this.page = 1;
    this.getEtudiants();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getEtudiants();
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getEtudiants();
  }
  /*********************
   * PAGINATION - START *
   *********************/

}
