import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { RenduDirective } from '../shared/rendu.directive';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import { FilterPipe } from "../filter.pipe";
import { Assignment } from 'app/shared/models/assignment.model';

@Component({
    selector: 'app-assignments',
    standalone: true,
    providers: [],
    templateUrl: './assignments.component.html',
    styleUrl: './assignments.component.css',
    imports: [
        MatCardModule,
        CommonModule,
        FormsModule,
        ScrollingModule,
        RouterLink,
        MatButtonModule,
        MatTable,
        MatTableModule,
        MatPaginatorModule,
        MatListModule,
        MatSliderModule,
        RenduDirective,
        AssignmentDetailComponent,
        AddAssignmentComponent,
        FilterPipe
    ]
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';

  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  displayedColumns: string[] = ['titre', 'etudiant', 'professeur','dateDeCreation','dateDeRendu','note','remarque','rendu'];

  assignments: Assignment[] = [];
  searchText:any;

  // pour virtual scroll infini
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  // ici on injecte le service
  constructor(private assignmentsService: AssignmentsService,
    private ngZone: NgZone) {}

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  ngOnInit() {
//    this.getAssignmentsFromService();
  }

  ngAfterViewInit() {
    if (!this.scroller) return;

    // on s'abonne à l'évènement scroll du virtual scroller
    this.scroller
      .elementScrolled()
      .pipe(
        tap(() => {

        }),
        map((event) => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),

        throttleTime(200)
      )
      .subscribe(() => {
          this.ngZone.run(() => {
            if (!this.hasNextPage) return;
            this.page = this.nextPage;
            this.getAssignmentsFromServicePourScrollInfini();
          });
      });
  }

  getAssignmentsFromService() {
/*
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
      */
  }

  getAssignmentsFromServicePourScrollInfini() {
    /*
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        console.log('Données arrivées');
        this.assignments = [...this.assignments, ...data.docs];
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
    */
  }

  // Pour la pagination
  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsFromService();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsFromService();
  }

  premierePage() {
    this.page = 1;
    this.getAssignmentsFromService();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentsFromService();
  }

  // Pour le composant angular material paginator
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsFromService();
  }
}