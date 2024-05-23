import { Component, OnInit } from '@angular/core';
import { AdministrateurService } from '../Administrateur.service';
import { Assignment } from 'app/shared/models/assignment.model';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FilterPipe } from 'app/filter.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PreloaderService } from 'app/shared/preload.service';

import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { AssignmentDeleteComponent } from 'app/shared/assignment-delete/assignment-delete.component';

@Component({
  selector: 'app-admin-assignment',
  standalone: true,
  providers: [],
  imports: [
    MatCardModule,
    MatDialogModule,
    FilterPipe,
    MatTableModule,
    CommonModule,
    MatTable,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  templateUrl: './admin-assignment.component.html',
  styleUrls: ['./admin-assignment.component.css']
})
export class AdminAssignmentComponent implements OnInit {

  // Liste des assignments
  assignments: Assignment[] = [];
  searchText: string = '';

  // tableau des assignments POUR AFFICHAGE
  displayedColumns: string[] = ['titre', 'dateDeCreation','dateDeRendu','note','rendu','action','supprimer'];

  //Pagination
  page = 1;
  limit = 5;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  // Modification d'un assignmnet
  rowIndex: number = 0;
  saving: boolean = false;
  firstFormGroup!: FormGroup;
  modifie: boolean = false;
  idAssignment: string = '';
  titre: string = "";
  dateDeCreation: Date = new Date;
  dateDeRendu: Date = new Date;
  note: number = 0;
  remarque: string = "";
  rendu: boolean= false;

  constructor(
    private adminService: AdministrateurService, 
    private _formBuilder: FormBuilder, 
    private preloader: PreloaderService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.resetList();
  }

  // Enregistrer les modifications
  update(assignment: any) {
    // console.log("ID Recue: ", this.idAssignment);
    // console.log("Input: ", assignment);
    this.saving = true;
    this.adminService.updateAssignment({
    
      titre: assignment.titre,
      dateDeCreation: assignment.dateDeCreation,
      dateDeRendu:  assignment.dateDeRendu,
      note: assignment.note

    }, this.idAssignment).subscribe((data) => {
      console.log("Update checked");
      this.saving = false;
      this.idAssignment = '';
      this.resetList();
    }) ;
  }

  // Afficher les champs modifiable
  modifier(assignment: any) {
    // console.log('data reçue:', assignment);
    this.modifie = true;
    this.idAssignment = assignment._id;
  }

  // Rendre | noter un assignment
  open(assign: any) {
    const rendreDialog = this.dialog.open(AssignmentDeleteComponent, {
      data: {
        assign: assign,        
      },
    });

    rendreDialog.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Delete checked");
        //console.log(result);
        this.resetList();
      }
    });
  }
  

  getAssignmentsFromService(){
    this.adminService.getAssignmentsPagines(this.page, this.limit).subscribe((data) => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
      this.preloader.hide();

    }) ;
    
  }

  // Pour le composant angular material paginator
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsFromService();
  }

  resetList(){
    this.getAssignmentsFromService();
  }

}
