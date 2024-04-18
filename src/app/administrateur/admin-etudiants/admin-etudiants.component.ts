import { Component, OnInit } from '@angular/core';
import { AdministrateurService } from '../Administrateur.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FilterPipe } from 'app/filter.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PreloaderService } from 'app/shared/preload.service';

@Component({
  selector: 'app-admin-etudiants',
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
  templateUrl: './admin-etudiants.component.html',
  styleUrls: ['./admin-etudiants.component.css']
})
export class AdminEtudiantsComponent implements OnInit {

  // Liste des étudiants
  etudiants: any;
  searchText: string = '';

  // Modification d'un etudiant
  saving: boolean = false;
  firstFormGroup!: FormGroup;
  modifie: boolean = false;
  idEtudiant: string = '';
  nom: string = '';
  prenom: string = '';
  email: string = '';
  niveau: string = '';

  constructor(private adminService: AdministrateurService, private _formBuilder: FormBuilder, private preloader: PreloaderService) { }

  update(): void {
    this.saving = true;
    this.adminService.updateEtudiant({
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      niveau: this. niveau
    }, this.idEtudiant).subscribe((data) => {
      this.saving = false;
      this.idEtudiant = '';
      this.clearUpdate({
        nom: '',
        prenom: '',
        email: '',
        niveau: ''
      });
      this.resetList();
    }) ;
  }

  // Afficher les champs modifiables
  modifier(etudiant: any): void {
    this.clearUpdate(etudiant);
    this.idEtudiant = etudiant._id;
    this.modifie = true;
  }

  // Nettoyer les champs
  clearUpdate(etudiant: any): void {
    this.nom = etudiant.nom;
    this.prenom = etudiant.prenom;
    this.email = etudiant.email;
    this.niveau = etudiant.niveau;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nomControl: ['', Validators.required],
      prenomControl: ['', Validators.required],
      emailControl: ['', Validators.required],
      niveauControl: ['', Validators.required]
    });

    this.resetList();
  }

  resetList(): void {
    this.adminService.getEtudiants().subscribe((data) => {
      this.etudiants = data;
      this.preloader.hide();
    });
  }

}
