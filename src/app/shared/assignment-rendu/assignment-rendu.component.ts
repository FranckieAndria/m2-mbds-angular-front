import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-assignment-rendu',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './assignment-rendu.component.html',
  styleUrls: ['./assignment-rendu.component.css']
})
export class AssignmentRenduComponent {

  assignment: any;

  constructor(public dialogRef: MatDialogRef<AssignmentRenduComponent>,
    @Inject(MAT_DIALOG_DATA) public assign: any
  ) {
    this.assignment = assign;
console.log(this.assignment);
  }

}
