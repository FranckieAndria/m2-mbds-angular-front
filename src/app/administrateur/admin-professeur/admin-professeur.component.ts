import { Component, OnInit } from '@angular/core';
import { AdministrateurService } from '../Administrateur.service';
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

@Component({
  selector: 'app-admin-professeur',
  standalone: true,
  imports: [
    MatCardModule,
    FilterPipe,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-professeur.component.html',
  styleUrls: ['./admin-professeur.component.css']
})
export class AdminProfesseurComponent implements OnInit {

  // Liste des professeurs
  professeurs: any;
  searchText: string = '';

  // Modification d'un professeur
  firstFormGroup!: FormGroup;
  modifie: boolean = false;
  idProfesseur: string = '';
  nom: string = '';
  prenom: string = '';
  email: string = '';

  constructor(private adminService: AdministrateurService, private _formBuilder: FormBuilder) { }

  modifier(idProfesseur: string) {
    this.clearUpdate();
    this.idProfesseur = idProfesseur;
    this.modifie = true;
  }

  clearUpdate() {
    this.nom = '';
    this.prenom = '';
    this.email = '';
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.adminService.getProfesseurs().subscribe((data) => {
      this.professeurs = data;
    }) ;
  }

}
