import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  constructor() {}

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
