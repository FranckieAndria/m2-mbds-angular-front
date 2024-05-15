import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Credentials } from 'app/shared/login/credentials.model';
import { AuthService } from 'app/shared/login/auth.service';
import { Router } from '@angular/router';
import { environnement } from 'environnement/environnement';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  // Connaissance que l'utilisateur se log
  logging: boolean = false;

  // User trying to log
  user_role: string = 'etudiants';
  user_role_interface = 'ETUDIANT';

  user_role_etudiant = 'ETUDIANT';
  user_role_professeur = 'PROFESSEUR' ;
  

  credentials: Credentials = {email: '', password: ''};
  error_login: Boolean = false;

  constructor(private authService: AuthService, private route: Router) {}

  changeUser() {
    this.error_login = false;
    this.user_role = this.user_role == 'etudiants' ? 'professeurs' : 'etudiants' ;
    this.user_role_interface = this.user_role_interface == this.user_role_etudiant ? this.user_role_professeur : this.user_role_etudiant ;
  }

  getOption() {
    let result = this.user_role_interface == this.user_role_etudiant ? this.user_role_professeur : this.user_role_etudiant;
    return result.toLowerCase();
  }
  
  login() {
    this.logging = true;
    this.authService.login(this.credentials, this.user_role).subscribe(
      data => {
        if (data.logged) {
          this.error_login = false;
          this.credentials.email = '';
          this.credentials.password = '';

          // Enregistrement dans le Localstorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          // Redirection selon le rôle de l'utilisateur connecté
          if (data.user.role == environnement.ROLE_ETUDIANT) this.route.navigate(['/etudiants']);
          else if (data.user.role == environnement.ROLE_PROFESSEUR) this.route.navigate(['/professeurs']);
          else if (data.user.role == environnement.ROLE_ADMINISTRATEUR) this.route.navigate(['/administrateurs']);
          else this.route.navigate(['/login']);
        } else {
          this.credentials.password = '';
          this.error_login = true;
          this.logging = false;
        }
      }
    )
  }

}
