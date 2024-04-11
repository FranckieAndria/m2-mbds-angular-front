import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { EtudiantService } from '../etudiant.service';
import { PreloaderService } from 'app/shared/preload.service';

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

  // Nombre d'assignment de l'Etudiant
  total: number = 0;
  rendu: number = 0;
  non_rendu: number = 0;

  // Nombre d'assignment de l'Etudiant groupé par matière
  stats: any;

  constructor(private etudiantService: EtudiantService, private preloader: PreloaderService) { }

  ngOnInit() {
    this.etudiantService.getHomeInfo().subscribe((data) => {
      this.total = data.total;
      this.rendu = data.rendu;
      this.non_rendu = data.non_rendu;
      this.preloader.hide();
    });

    this.etudiantService.getHomeInfoStats().subscribe((data) => {
      console.log(data);
    });
  }

}
