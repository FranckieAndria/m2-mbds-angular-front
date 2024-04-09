import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantsComponent } from './etudiants.component';

import { EtudiantsAssignmentsComponent } from './etudiants-assignments/etudiants-assignments.component';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantsAddAssignmentComponent } from './etudiants-add-assignment/etudiants-add-assignment.component';
import { EtudiantSearchAssignmentComponent } from './etudiant-search-assignment/etudiant-search-assignment.component';
import { EtudiantScoreComponent } from './etudiant-score/etudiant-score.component';
import { EtudiantHomeComponent } from './etudiant-home/etudiant-home.component';

const etudiantsRoutes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: EtudiantHomeComponent
  },
  {
    path: 'assignments',
    component: EtudiantsAssignmentsComponent
  },
  {
    path: 'add-assignment',
    component: EtudiantsAddAssignmentComponent
  },
  {
    path: 'search',
    component: EtudiantSearchAssignmentComponent
  },
  {
    path: 'score',
    component: EtudiantScoreComponent
  }
];

@NgModule({
  imports: [
    EtudiantsComponent,
    CommonModule,
    RouterModule.forChild(etudiantsRoutes)
  ],
  declarations: []
})
export class EtudiantsModule { }
