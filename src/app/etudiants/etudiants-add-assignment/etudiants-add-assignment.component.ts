import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { Matiere } from 'app/shared/models/matiere.model';
import { EtudiantService } from '../etudiant.service';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { AssignmentSave } from 'app/shared/models/assignment.save.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-etudiants-add-assignment',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe,
  ],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    CommonModule,
  ],
  templateUrl: './etudiants-add-assignment.component.html',
  styleUrls: ['./etudiants-add-assignment.component.css'],
})
export class EtudiantsAddAssignmentComponent implements OnInit {
  // Liste des matières et professeurs avec Image
  matieres: Matiere[] = [];

  // Contrôle des steppers
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  // La valeur saisies dans les champs - START
  minDate = new Date();
  titre!: string;
  dateDeRendu!: string;
  professeur = {
    _id: '',
    nom: '',
    prenom: '',
    imagePath: '',
    matiere: '',
  };

  // Enregistrement du nouvel assignment
  saveAssignment(): void {
    let assignment = new AssignmentSave();
    assignment.titre = this.titre;
    assignment.professeur = this.professeur._id;
    assignment.dateDeRendu = this.datePipe.transform(this.dateDeRendu, 'yyyy-MM-dd') || '';

    this.etudiantService.saveAssignment(assignment).subscribe((data) => {
      this.resetMatiere();
      this.snackBar.open('Enregistrement effectué avec succès', 'OK', {
        duration: 3000,
        panelClass: ['snackbar']
      });
    });
  }

  resetMatiere(): void {
    this.professeur = {
      _id: '',
      nom: '',
      prenom: '',
      imagePath: '',
      matiere: '',
    };
  }

  // L'utilisateur commence à compléter le formulaire => On retire l'icône dans la partie droite et on complète aen parallèle
  isOnCompletion() {
    return this.titre || this.professeur.nom != '' || this.dateDeRendu;
  }

  // Choix de la matière
  onSelectionChange(event: any): void {
    const idMatiere = event.value;
    for (const mat of this.matieres) {
      if (mat._id == idMatiere) {
        this.professeur = {
          _id: mat._id,
          nom: mat.nom,
          prenom: mat.prenom,
          imagePath: mat.imagePath,
          matiere: mat.matiere.intitule,
        };
      }
    }
  }

  constructor(
    private _formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.etudiantService.getMatieres().subscribe((data) => {
      this.matieres = data;
    });

    // Stepper contrôle
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({});
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }
}
