import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showPassword: boolean;
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  login() {
    const { email, password } = this.form.value;

    this.userService
      .login({
        email,
        password,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard');
        },
      });
  }
}
