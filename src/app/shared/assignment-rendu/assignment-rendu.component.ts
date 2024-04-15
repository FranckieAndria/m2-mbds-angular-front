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
  templateUrl: './assignment-rendu.component.html',
  styleUrls: ['./assignment-rendu.component.css']
})
export class AssignmentRenduComponent implements OnInit {

  // L'assignment à rendre - noter et enregistrer une remarque
  assignment: any;

  // Les inputs dans le formulaire
  firstFormGroup!: FormGroup;
  note: number = 20;
  remarque: string = '';

  // Gestion des animations et informations sur le Modal
  isOperating: boolean = false;
  isSuccess: boolean = false;

  constructor(public dialogRef: MatDialogRef<AssignmentRenduComponent>,
    @Inject(MAT_DIALOG_DATA) public assign: any, private _formBuilder: FormBuilder, private professeurService: ProfesseurService
  ) {
    this.assignment = assign;
  }

  // Rendre - noter l'assignment
  rendreNoter() {
    this.isOperating = true;
    this.professeurService.noterRendre(this.assignment.assign._id, this.assignment.rendre, this.note, this.remarque).subscribe((data) => {
      if (data) {
console.log(data);
        this.isOperating = false;
        this.isSuccess = true;
      }
    });
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }

}
