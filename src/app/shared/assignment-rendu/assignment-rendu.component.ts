import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

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
    MatDividerModule
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

  constructor(public dialogRef: MatDialogRef<AssignmentRenduComponent>,
    @Inject(MAT_DIALOG_DATA) public assign: any, private _formBuilder: FormBuilder
  ) {
    this.assignment = assign;
console.log(this.assignment);
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
  }

}
