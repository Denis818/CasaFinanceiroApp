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

  constructor(
    private readonly user: UserService,
    public readonly titleService: Title
  ) {}

  toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
  }

  logout() {
    this.user.logout();
  }
}
