import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EtudiantService } from '../etudiant.service';
import { Score } from 'app/shared/models/score.model';
import { PreloaderService } from 'app/shared/preload.service';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-etudiant-score',
  standalone: true,
  imports: [MatIconModule, MatGridListModule, MatButtonModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './etudiant-score.component.html',
  styleUrls: ['./etudiant-score.component.css'],
})
export class EtudiantScoreComponent implements OnInit {
  // Relevé des notes
  scores: Score[] = [];

  // Récupération du PDF
  isGetting: Boolean = false;
  studentInfo = {
    nom: '',
    prenom: '',
    email: '',
    niveau: ''
  };

  constructor(
    private etudiantService: EtudiantService,
    private preloader: PreloaderService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  getReport() {
    this.isGetting = true;
    this.getStudentInformation();
    this.etudiantService.getReport(this.studentInfo) ;
  }

  getStudentInformation() {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const userJson = localStorage.getItem('user') || '{}' ;
      const user = JSON.parse(userJson) ;
      if (user.nom && user.prenom) {
        this.studentInfo.nom = user.nom.toUpperCase();
        this.studentInfo.prenom = user.prenom;
        this.studentInfo.email = user.email;
        this.studentInfo.niveau = user.role;
      }
    }
  }

  ngOnInit() {
    this.etudiantService.getScores().subscribe((data) => {
      this.scores = data;
      this.preloader.hide();
    });
  }
}
