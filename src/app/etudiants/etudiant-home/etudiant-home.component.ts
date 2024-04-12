import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { EtudiantService } from '../etudiant.service';
import { PreloaderService } from 'app/shared/preload.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-etudiant-home',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './etudiant-home.component.html',
  styleUrls: ['./etudiant-home.component.css']
})
export class EtudiantHomeComponent implements OnInit, AfterViewInit {

  // Nombre d'assignment de l'Etudiant
  total: number = 0;
  rendu: number = 0;
  non_rendu: number = 0;

  // Table triée
  displayedColumns: string[] = ['Matiere', 'Professeur', 'Total'];
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private etudiantService: EtudiantService, private preloader: PreloaderService, private _liveAnnouncer: LiveAnnouncer) { }
 
  ngAfterViewInit(): void {
    this.etudiantService.getHomeInfoStats().subscribe((data) => {
      const stats = this.etudiantService.getArrayInfoStats(data.docs) ;
      this.dataSource = new MatTableDataSource(stats);
      this.dataSource.sort = this.sort;
    });
  }

  // Annonce un changement dans le tri de la table
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit() {
    this.etudiantService.getHomeInfo().subscribe((data) => {
      this.total = data.total;
      this.rendu = data.rendu;
      this.non_rendu = data.non_rendu;
      this.preloader.hide();
    });
  }

}
