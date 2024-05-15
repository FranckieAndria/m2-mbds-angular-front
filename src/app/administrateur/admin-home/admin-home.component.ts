import { Component, OnInit } from '@angular/core';
import { AdministrateurService } from '../Administrateur.service';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { PreloaderService } from 'app/shared/preload.service';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-admin-home',
  standalone:true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  total: number = 0;
  rendu: number = 0;
  non_rendu: number = 0;
  professeurs : any;

  constructor(private preloader: PreloaderService,private adminService: AdministrateurService) { }

  ngOnInit() {
    this.adminService.checker().subscribe((data) => {
      
    });
    this.loadHome();
  }

  loadHome(){
    this.adminService.home().subscribe((data)=>{
      this.total = data.total || 0;
      this.rendu = data.rendu || 0;
      this.non_rendu = data.non_rendu || 0;
      this.professeurs = data.professeurs;
      this.preloader.hide();
    })
  }

}
