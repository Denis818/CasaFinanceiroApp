import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SideNavComponent {
  selectedButton: string = '';
  sidenavExpanded = false;

  constructor(
    private router: Router,
    private readonly localStorage: StorageService
  ) {
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
        } else if (event.urlAfterRedirects.includes('valores-a-receber')) {
          this.setSelectedButton('valores-a-receber');
        }
      });
  }

  isMaster(): boolean {
    const email = this.localStorage.getItem('userEmail');
    console.log(email);
    return email === 'master@gmail.com';
  }
}
