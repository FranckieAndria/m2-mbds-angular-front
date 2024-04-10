import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AssignmentsService } from '../assignments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-assignments',
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
  ],
  templateUrl: './details-assignments.component.html',
  styleUrls: ['./details-assignments.component.css']
})
export class DetailsAssignmentsComponent {

  details: any;

  constructor(public dialogRef: MatDialogRef<DetailsAssignmentsComponent>, 
    @Inject(MAT_DIALOG_DATA) public _id: any, private assignmentService: AssignmentsService
  ) {
    this.assignmentService.getAssignment(_id._id).subscribe((data) => {
      this.details = data.assignment[0] ;
    }) ;
  }

}
