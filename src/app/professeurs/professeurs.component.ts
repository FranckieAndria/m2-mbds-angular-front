import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-professeurs',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './professeurs.component.html',
  styleUrls: ['./professeurs.component.css']
})
export class ProfesseursComponent implements OnInit {

  // Professeur connecté
  nom: string = '';
  prenom: string = '';
  imagePath: string = '';

  // Liste des menus
  menus: any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  constructor(private observer: BreakpointObserver, @Inject(DOCUMENT) private document: Document) {
    this.initAllMenu();
  }

  initAllMenu(): void {
    this.menus = [
      {
        'label': 'Accueil',
        'icon': 'home',
        'link': '/professeurs'
      },
      {
        'label': 'Mes assignments',
        'icon': 'list',
        'link': 'assignments'
      },
      {
        'label': 'Mes étudiants',
        'icon': 'person_outline',
        'link': 'etudiants'
      },
      {
        'label': 'Se déconnecter',
        'icon': 'logout',
        'link': '/logout'
      },
    ];
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.loadUserName();
  }

  loadUserName() {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const userJson = localStorage.getItem('user') || '{}' ;
      const user = JSON.parse(userJson) ;
      if (user.nom && user.prenom) {
        this.nom = user.nom.toUpperCase();
        this.prenom = user.prenom;
        this.imagePath = user.imagePath;
      }
    }
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

}