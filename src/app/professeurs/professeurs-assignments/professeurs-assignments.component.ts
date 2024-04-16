import { Component,ViewChild,NgZone,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from 'app/shared/models/assignment.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AssignmentsService } from 'app/shared/assignments.service';
import { ProfesseurService } from '../professeurs.service';
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

import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-professeurs-assignments',
  standalone: true,
  providers: [],
  templateUrl: './professeurs-assignments.component.html',
  styleUrls: ['./professeurs-assignments.component.css'],
  imports :[
    DragDropModule,
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
    MatSliderModule
  ]
})
export class ProfesseursAssignmentsComponent implements OnInit {


  // Pour la pagination
  page = 1;
  limit = 10;
  nonRendu = -1;
  rendu = 1
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  assignmentsRendu: Assignment[] = [];
  assignmentsNonRendu: Assignment[] = [];

  //Exemple drag data
  books = ['Book 1', 'Book 2', 'Book 3', 'Book 4'];

  // Define an empty array for the target data
  targetBooks: string[] = [];

  // tableau des assignments POUR AFFICHAGE
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];

  // pour virtual scroll infini
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

    constructor(private professeurService: ProfesseurService,
      private ngZone: NgZone) { }  

  ngOnInit() {
    console.log('ngOnInit assignments, appelée AVANT affichage du composant');
    this.getAssignmentsFromServicePourScrollInfiniRendu();
    this.getAssignmentsFromServicePourScrollInfiniNonRendu();
  }
  ngAfterViewInit() {
    console.log(' ----- after view init ----');

    if (!this.scroller){
      console.log('Error data');
      return;
    } 

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
            this.getAssignmentsFromServicePourScrollInfiniRendu();
            this.getAssignmentsFromServicePourScrollInfiniNonRendu();
          });
      });
  }

  // getAssignmentsFromService() {
    
    
  //   this.professeurService
  //     .getAssignmentsProfPagines(this.page,this.limit,0)
  //     .subscribe((data) => {
  //       // les données arrivent ici au bout d'un certain temps
  //       console.log('Données arrivées');
  //       this.assignments = data.docs;
  //       this.totalDocs = data.totalDocs;
  //       this.totalPages = data.totalPages;
  //       this.nextPage = data.nextPage;
  //       this.prevPage = data.prevPage;
  //       this.hasNextPage = data.hasNextPage;
  //       this.hasPrevPage = data.hasPrevPage;
  //     });
  //   console.log('Requête envoyée');
  // }

  getAssignmentsFromServicePourScrollInfiniRendu() {
  //   // on récupère les assignments depuis le service
    this.professeurService
      .getAssignmentsProfPagines(this.page,this.limit,this.rendu)
       .subscribe((data) => {
         // les données arrivent ici au bout d'un certain temps
         console.log('Données arrivées');
         
         this.assignmentsRendu = [...this.assignmentsRendu, ...data.docs];
         this.totalDocs = data.totalDocs;
         this.totalPages = data.totalPages;
         this.nextPage = data.nextPage;
         this.prevPage = data.prevPage;
         this.hasNextPage = data.hasNextPage;
         this.hasPrevPage = data.hasPrevPage;
       });
     console.log('Requête envoyée');
   }

   getAssignmentsFromServicePourScrollInfiniNonRendu() {
    //   // on récupère les assignments depuis le service
      this.professeurService
        .getAssignmentsProfPagines(this.page,this.limit,this.nonRendu)
         .subscribe((data) => {
           // les données arrivent ici au bout d'un certain temps
           console.log('Données arrivées');
           
           this.assignmentsNonRendu = [...this.assignmentsNonRendu, ...data.docs];
           this.totalDocs = data.totalDocs;
           this.totalPages = data.totalPages;
           this.nextPage = data.nextPage;
           this.prevPage = data.prevPage;
           this.hasNextPage = data.hasNextPage;
           this.hasPrevPage = data.hasPrevPage;
         });
       console.log('Requête envoyée');
     }

   //Drag and drop
  onDropNonRendu(event: CdkDragDrop<Assignment[]>) {
    const assignment = this.assignmentsNonRendu[event.previousIndex];
    console.log("Data : "+assignment.titre+" id: "+assignment._id);
    
    //Code pour mettre à jour vos données ici
    try {
      this.professeurService
        .noterRendre(assignment._id,true,15,"Remarque")
        .subscribe(()=>{
          console.log("Données modifiées");
          this.ngZone.run(() => {
            // Code à exécuter à l'intérieur de la zone Angular
            // (déclenchera la détection des changements)
            this.getAssignmentsFromServicePourScrollInfiniNonRendu();
            this.getAssignmentsFromServicePourScrollInfiniRendu();
          });
        });
    } catch (err) {
      console.log("Erreur lors de l'exécution de la méthode");
    }
  }



}
