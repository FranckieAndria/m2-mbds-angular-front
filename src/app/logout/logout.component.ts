import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) localStorage.clear();
  }

}
