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

@Component({
  selector: 'app-professeurs-etudiants',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FilterPipe,
    MatCardModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule
  ],
  templateUrl: './professeurs-etudiants.component.html',
  styleUrls: ['./professeurs-etudiants.component.css']
})
export class ProfesseursEtudiantsComponent implements OnInit {

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

  // Liste des étudiants du professeur
  etudiants: any ;
  searchText: any;

  constructor(private professeurService: ProfesseurService, private preloader: PreloaderService) { }

  ngOnInit() {
    this.getEtudiants();
  }

  getEtudiants() {
    this.professeurService.getEtudiants().subscribe((data) => {
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
