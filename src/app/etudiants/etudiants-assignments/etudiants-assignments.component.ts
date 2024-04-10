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
// IMPORTATION material - END

@Component({
  selector: 'app-etudiants-assignments',
  standalone: true,
  imports: [FilterPipe, CommonModule, RouterLink, FormsModule, MatCardModule, MatListModule, MatButtonModule, MatSliderModule, MatTable, MatTableModule, MatPaginatorModule],
  templateUrl: './etudiants-assignments.component.html',
  styleUrls: ['./etudiants-assignments.component.css']
})
export class EtudiantsAssignmentsComponent implements OnInit {

  assignments: Assignment[] = [];

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
  searchText:any;
  /***********************
  * FIELDS in PAGE - END *
  ***********************/

  constructor(private etudiantService: EtudiantService, private preloader: PreloaderService) { }

  ngOnInit() {
    this.getAssignments();
  }


  // Liste des assignments de l'étudiant connecté
  getAssignments() {
    this.etudiantService.getAssignmentsPagines((this.page + 1), this.limit).subscribe((data) => {
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
