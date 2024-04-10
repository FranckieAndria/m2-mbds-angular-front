import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-etudiant-home',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
  ],
  templateUrl: './etudiant-home.component.html',
  styleUrls: ['./etudiant-home.component.css']
})
export class EtudiantHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
