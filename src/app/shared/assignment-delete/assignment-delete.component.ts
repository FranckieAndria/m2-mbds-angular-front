import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { AdministrateurService } from 'app/administrateur/Administrateur.service';
import { ProfesseurService } from 'app/professeurs/professeurs.service';

@Component({
  selector: 'app-assignment-rendu',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './assignment-delete.component.html',
  styleUrls: ['./assignment-delete.component.css']
})
export class AssignmentDeleteComponent implements OnInit {

  // L'assignment à rendre - noter et enregistrer une remarque
  assignment: any;

  // Gestion des animations et informations sur le Modal
  isOperating: boolean = false;
  isSuccess: boolean = false;

  constructor(public dialogRef: MatDialogRef<AssignmentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public assign: any, private _formBuilder: FormBuilder,private adminService: AdministrateurService
  ) {
    this.assignment = assign;
  }

  // Rendre - noter l'assignment
  supprimer() {
    this.isOperating = true;
    // console.log("Data reçue", this.assignment);
    // console.log("ID Actu: ", this.assignment.assign._id);
    this.adminService.
      deleteAssignment(this.assignment.assign._id)
      .subscribe((data)=>{
        console.log("Delete checked");
        this.isOperating = false;
        this.isSuccess = true;
      });
  }

  ngOnInit(): void {
    this.assignment;
    // console.log("Data reçue: ",this.assignment);
  }

}
