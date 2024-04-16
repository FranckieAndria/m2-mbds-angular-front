import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesseursAssignmentsComponent } from './professeurs-assignments/professeurs-assignments.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfesseursComponent } from './professeurs.component';
import { ProfesseursEtudiantsComponent } from './professeurs-etudiants/professeurs-etudiants.component';
import { ProfesseursHomeComponent } from './professeurs-home/professeurs-home.component';

const professeurRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ProfesseursHomeComponent
  },
  {
    path: 'etudiants',
    component: ProfesseursEtudiantsComponent
  },
  {
    path: 'assignments',
    component: ProfesseursAssignmentsComponent
  }
];

@NgModule({
  imports: [
    ProfesseursComponent,
    CommonModule,
    RouterModule.forChild(professeurRoutes)
  ],
  declarations: []
})
export class ProfesseursModule { }
