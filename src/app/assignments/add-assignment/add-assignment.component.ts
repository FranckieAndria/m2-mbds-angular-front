import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { Assignment } from 'app/shared/models/assignment.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent {
  // champs du formulaire
  nomAssignment = '';
  dateDeRendu = undefined;

  constructor(private assignmentsService: AssignmentsService,
              private router:Router) {}

  onSubmit(event: any) {
    if((this.nomAssignment == '') || (this.dateDeRendu === undefined)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.titre= this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((reponse) => {
        console.log(reponse);
        this.router.navigate(['/home']);
      });
  }

}
