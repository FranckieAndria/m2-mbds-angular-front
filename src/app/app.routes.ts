import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfesseursComponent } from './professeurs/professeurs.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'etudiants',
    component: EtudiantsComponent,
    loadChildren: () => import('./etudiants/etudiants.module').then(m =>m.EtudiantsModule)
  },
  {
    path: "professeurs", 
    component: ProfesseursComponent,
    loadChildren: () => import('./professeurs/professeurs.module').then(m => m.ProfesseursModule)
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  }
];
