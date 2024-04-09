import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';

/* ANGULAR MATERIAL IMPORT - START */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
/* ANGULAR MATERIAL IMPORT - END */

@Component({
  selector: 'app-etudiants',
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
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {

  // User connecté
  nom: string = '';
  prenom: string= '';
  imagePath: string = '';

  // Liste des menus
  menus:any ;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  constructor(private observer: BreakpointObserver, @Inject(DOCUMENT) private document: Document) {
    this.initAllMenu();
  }

  initAllMenu() {
    this.menus = [
      {
        'label': 'Accueil',
        'icon': 'home',
        'link': '/etudiants'
      },
      {
        'label': 'Nouvel assignment',
        'icon': 'add',
        'link': 'add-assignment'
      },
      {
        'label': 'Mes assignments',
        'icon': 'list',
        'link': 'assignments'
      },
      {
        'label': 'Recherche',
        'icon': 'search',
        'link': 'search'
      },
      {
        'label': 'Relevé de note',
        'icon': 'school',
        'link': 'score'
      },
      {
        'label': 'Se déconnecter',
        'icon': 'logout',
        'link': '/logout'
      }
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
