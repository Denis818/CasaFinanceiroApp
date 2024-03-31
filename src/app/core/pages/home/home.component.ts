import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/domain/auth/services/user/user.service';
import { Router } from '@angular/router';
export const onSideNavChange = trigger('onSideNavChange', [
  state(
    'close',
    style({
      transform: 'translate3d(-100%, 0px, 0px)',
    })
  ),
  state(
    'open',
    style({
      transform: 'translate3d(0%, 0px, 0px)',
      minWidth: '200px',
    })
  ),
  transition('close => open', animate('550ms ease-in-out')),
  transition('open => close', animate('550ms ease-in-out')),
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [onSideNavChange],
})
export class HomeComponent {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  constructor(private readonly router: Router,
    private readonly user: UserService,
    public readonly titleService: Title
  ) {}

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
  logout() {
    this.user.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
    });
  }
}
