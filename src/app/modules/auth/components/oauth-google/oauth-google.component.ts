import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-oauth-google',
  templateUrl: './oauth-google.component.html',
  styleUrls: ['./oauth-google.component.css'],
})
export class OauthGoogleComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  ngOnInit() {}
  loginWithGoogle() {
    this.userService.signinGoogle();
  }
}
