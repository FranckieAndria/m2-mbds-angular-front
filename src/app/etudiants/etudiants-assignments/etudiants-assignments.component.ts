// IMPORTATION - START
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
// IMPORTATION - END

// IMPORTATION model service - START
import { FilterPipe } from 'app/filter.pipe';
// IMPORTATION model service - END

// IMPORTATION material - START
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { EtudiantService } from '../etudiant.service';
import { PreloaderService } from 'app/shared/preload.service';
import { Assignment } from 'app/shared/models/assignment.model';
import { MatDialog } from '@angular/material/dialog';
import { DetailsAssignmentsComponent } from 'app/shared/details-assignments/details-assignments.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
// IMPORTATION material - END

@Component({
  selector: 'app-etudiants-assignments',
  standalone: true,
  imports: [
    FilterPipe,
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatSliderModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatRadioModule,
  ],
  templateUrl: './etudiants-assignments.component.html',
  styleUrls: ['./etudiants-assignments.component.css'],
})
export class EtudiantsAssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];

  /***********************************************************
  * FILTRE DE Récupération depuis la base de données - START *
  ***********************************************************/
  statut: number = 0;
  tri: number = 1;
  /*********************************************************
  * FILTRE DE Récupération depuis la base de données - END *
  *********************************************************/

  /************************************
   * FIELDS pour la pagination - START *
   ************************************/
  page = 0;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  /**********************************
   * FIELDS pour la pagination - END *
   **********************************/

  /*************************
   * FIELDS in PAGE - START *
   *************************/
  titre = 'Mes assignments';
  searchText: any;
  /***********************
   * FIELDS in PAGE - END *
   ***********************/

  constructor(
    private etudiantService: EtudiantService,
    private preloader: PreloaderService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAssignments();
  }

  // Affichage des détails de l'Assignment
  showDetails(_id: string) {
    this.dialog.open(DetailsAssignmentsComponent, {
      data: {
        _id: _id,
      },
    });
  }

  // Change le statut des assignments à récupérer
  changeStatut() {
    this.page = 0;
    this.limit = 10;
    this.getAssignments();
  }

  // Liste des assignments de l'étudiant connecté
  getAssignments() {
    this.etudiantService
      .getAssignmentsPagines(this.page + 1, this.limit, this.statut, this.tri)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;

        this.preloader.hide();
      });
  }

  /*********************
   * PAGINATION - START *
   *********************/
  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAssignments();
  }
  /*********************
   * PAGINATION - START *
   *********************/
}
