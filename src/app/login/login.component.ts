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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials: Credentials = {email: '', password: ''};
  error_login: Boolean = false;

  constructor(private authService: AuthService, private route: Router) {}

  login() {
    this.authService.login(this.credentials, 'etudiants').subscribe(
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
          else this.route.navigate(['/login']);
        } else {
          this.credentials.password = '';
          this.error_login = true;
        }
      }
    )
  }

}
