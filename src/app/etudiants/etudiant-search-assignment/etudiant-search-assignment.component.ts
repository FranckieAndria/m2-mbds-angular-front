import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  FloatLabelType,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Matiere } from 'app/shared/models/matiere.model';
import { EtudiantService } from '../etudiant.service';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-etudiant-search-assignment',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    CommonModule,
  ],
  templateUrl: './etudiant-search-assignment.component.html',
  styleUrls: ['./etudiant-search-assignment.component.css'],
})
export class EtudiantSearchAssignmentComponent implements OnInit {
  // Liste des matières et professeurs avec Image
  matieres: Matiere[] = [];

  // La recherche est effectuée et pagination
  searching: boolean = false;
  page = 1;
  limit = 10;
  totalDocs: number = 0;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  // Formulaire de recherche
  titre!: string;
  matiere: string = "Toutes les matières";
  dateDeCreationInf!: string;
  dateDeCreationSup!: string;
  statut: number = 0;
  dateDeRenduInf!: string;
  dateDeRenduSup!: string;
  statuts: string[] = ["Tous", "Rendu", "Non-rendu"];

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    floatLabel: this.floatLabelControl,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
    private datePipe: DatePipe
  ) {}

  search() {
    this.searching = true;
    const dateDeCreationInf = this.datePipe.transform(this.dateDeCreationInf, "dd-MM-yyyy") || "" ;
    const dateDeCreationSup = this.datePipe.transform(this.dateDeCreationSup, "dd-MM-yyyy") || "" ;
    const dateDeRenduInf = this.datePipe.transform(this.dateDeRenduInf, "dd-MM-yyyy") || "" ;
    const dateDeRenduSup = this.datePipe.transform(this.dateDeRenduSup, "dd-MM-yyyy") || "" ;
    this.etudiantService.search(this.titre, this.matiere, dateDeCreationInf, dateDeCreationSup, dateDeRenduInf, dateDeRenduSup, this.statut).subscribe((data) => {
      console.log(data);
    }) ;
  }

  ngOnInit() {
    this.etudiantService.getMatieres().subscribe((data) => {
      this.matieres = data;
    });
  }
}
