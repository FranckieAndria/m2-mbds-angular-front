import { Component, OnInit } from '@angular/core';
import { AdministrateurService } from '../Administrateur.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private adminService: AdministrateurService) { }

  ngOnInit() {
    this.adminService.checker().subscribe((data) => {
      
    });
  }

}
