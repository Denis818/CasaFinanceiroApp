import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/domain/auth/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  selectedButton: string;
  sidenavExpanded = false;
  isDesktop: boolean = true;

  constructor(
    private readonly user: UserService,
    public readonly titleService: Title
  ) {}

  abrirSidenav() {
    this.sidenavExpanded = true;
  }

  fecharSidenav() {
    this.sidenavExpanded = false;
  }

  checkIfMobile(): boolean {
    if (window.innerWidth < 768) {
      return false;
    }
    return true;
  }

  logout() {
    this.user.logout();
  }
}
