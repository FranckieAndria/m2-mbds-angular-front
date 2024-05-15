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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PreloaderService } from 'app/shared/preload.service';

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
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-professeur.component.html',
  styleUrls: ['./admin-professeur.component.css']
})
export class AdminProfesseurComponent implements OnInit {

  // Liste des professeurs
  professeurs: any;
  searchText: string = '';

  // Modification d'un professeur
  saving: boolean = false;
  firstFormGroup!: FormGroup;
  modifie: boolean = false;
  idProfesseur: string = '';
  nom: string = '';
  prenom: string = '';
  email: string = '';

  constructor(private adminService: AdministrateurService, private _formBuilder: FormBuilder, private preloader: PreloaderService) { }

  // Enregistrer les modifications
  update() {
    this.saving = true;
    this.adminService.updateProfesseur({
      nom: this.nom,
      prenom: this.prenom,
      email: this.email
    }, this.idProfesseur).subscribe((data) => {
      this.saving = false;
      this.idProfesseur = '';
      this.clearUpdate({
        nom: '',
        prenom: '',
        email: ''
      });
      this.resetList();
    }) ;
  }

  // Afficher les champs modifiable
  modifier(professeur: any) {
    this.clearUpdate(professeur);
    this.idProfesseur = professeur._id;
    this.modifie = true;
  }

  // Nettoyer les champs
  clearUpdate(professeur: any) {
    this.nom = professeur.nom;
    this.prenom = professeur.prenom;
    this.email = professeur.email;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nomControl: ['', Validators.required],
      prenomControl: ['', Validators.required],
      emailControl: ['', Validators.required],
    });

    this.resetList();
  }

  resetList() {
    this.adminService.getProfesseurs().subscribe((data) => {
      this.professeurs = data;
      this.preloader.hide();
    }) ;
  }

}
