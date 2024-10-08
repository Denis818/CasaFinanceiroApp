import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SideNavComponent {
  selectedButton: string = '';
  sidenavExpanded = false;

  constructor(private router: Router) {
    this.updateSelectedButtonFromRoute();
  }

  abrirSidenav() {
    this.sidenavExpanded = true;
  }

  fecharSidenav() {
    this.sidenavExpanded = false;
  }

  checkIfMobile(): boolean {
    return window.innerWidth >= 768;
  }

  setSelectedButton(button: string) {
    this.selectedButton = button;
  }

  updateSelectedButtonFromRoute() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('dashboard')) {
          this.setSelectedButton('dashboard');
        } else if (event.urlAfterRedirects.includes('painel-controle')) {
          this.setSelectedButton('painel-controle');
        } else if (event.urlAfterRedirects.includes('auditoria-compras')) {
          this.setSelectedButton('auditoria-compras');
        } else if (event.urlAfterRedirects.includes('comparativo-faturas')) {
          this.setSelectedButton('comparativo-faturas');
        }
      });
  }
}
