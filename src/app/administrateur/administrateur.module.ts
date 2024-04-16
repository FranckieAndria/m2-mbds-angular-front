import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrateurComponent } from './administrateur.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminEtudiantsComponent } from './admin-etudiants/admin-etudiants.component';
import { AdminProfesseurComponent } from './admin-professeur/admin-professeur.component';

const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AdminHomeComponent
  },
  {
    path: 'etudiants',
    component: AdminEtudiantsComponent
  },
  {
    path: 'professeurs',
    component: AdminProfesseurComponent
  }
];

@NgModule({
  imports: [
    AdministrateurComponent,
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: []
})
export class AdministrateurModule { }
