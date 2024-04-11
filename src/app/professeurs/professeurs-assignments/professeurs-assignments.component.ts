import { Component,ViewChild,NgZone,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from 'app/shared/models/assignment.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AssignmentsService } from 'app/shared/assignments.service';
import { AssignmentDetailComponent } from 'app/assignments/assignment-detail/assignment-detail.component';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

import { RouterLink } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-professeurs-assignments',
  standalone: true,
  templateUrl: './professeurs-assignments.component.html',
  styleUrls: ['./professeurs-assignments.component.css'],
  imports :[
    ScrollingModule,
    CommonModule,
    RouterLink,
    MatCardModule,
    FormsModule,
    AssignmentDetailComponent,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,

  ]
})
export class ProfesseursAssignmentsComponent implements OnInit {

  // Pour la pagination
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  assignments: Assignment[] = [];

  // pour virtual scroll infini
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(private assignmentsService: AssignmentsService,
    private ngZone: NgZone) { }

  ngOnInit() {
    console.log('ngOnInit assignments, appelée AVANT affichage du composant');
    this.getAssignmentsFromService();
  }

  ngAfterViewInit() {
    console.log(' ----- after view init ----');

    if (!this.scroller) return;

    // on s'abonne à l'évènement scroll du virtual scroller
    this.scroller
      .elementScrolled()
      .pipe(
        tap(() => {
          //const dist = this.scroller.measureScrollOffset('bottom');
          /*console.log(
            'dans le tap, distance par rapport au bas de la fenêtre = ' + dist
          );*/
        }),
        map((event) => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        throttleTime(200)
      )
      .subscribe(() => {
        // On ne rentre que si on scrolle vers le bas, que si
        // la distance de la scrollbar est < 100 pixels et que
        // toutes les 200 ms
          console.log('On demande de nouveaux assignments');
          // on va faire une requête pour demander les assignments suivants
          // et on va concatener le resultat au tableau des assignments courants
          console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);
          this.ngZone.run(() => {
            if (!this.hasNextPage) return;
            this.page = this.nextPage;
            this.getAssignmentsFromServicePourScrollInfini();
          });
      });
  }

  getAssignmentsFromService() {
    // on récupère les assignments depuis le service
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  getAssignmentsFromServicePourScrollInfini() {
  //   // on récupère les assignments depuis le service
     this.assignmentsService
       .getAssignmentsPagines(this.page, this.limit)
       .subscribe((data) => {
         // les données arrivent ici au bout d'un certain temps
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
   }

}
