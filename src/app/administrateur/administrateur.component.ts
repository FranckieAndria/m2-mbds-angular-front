import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-administrateur',
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
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit {

  // Liste des menus à gauche
  menus: any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  constructor(private observer: BreakpointObserver) {
    this.initAllMenu();
  }

  initAllMenu() {
    this.menus = [
      {
        label: 'Accueil',
        icon: 'home',
        link: '/administrateurs'
      },
      {
        label: 'Professeurs',
        icon: 'supervisor_account',
        link: 'professeurs'
      },
      {
        label: 'Etudiants',
        icon: 'folder_shared',
        link: 'etudiants'
      },
      {
        label: 'Se déconnecter',
        icon: 'logout',
        link: '/logout'
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
