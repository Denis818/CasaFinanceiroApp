import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  public email!: string;
  public password!: string;
  public showPassword: boolean = false;
  hide = true;
  public errorMessage!: string;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  public login() {
    this.spinner.show();
    const dados = {
      email: this.email,
      password: this.password,
    };

    this.userService.login(dados).subscribe({
      next: () => {
        this.spinner.hide();
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => this.error(err?.error?.Mensagens),
    });
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordInput.nativeElement.setAttribute('type', 'text');
    } else {
      this.passwordInput.nativeElement.setAttribute('type', 'password');
    }
  }

  public error(errMessages: any): void {
    this.spinner.hide();

    if (errMessages?.length > 0) {
      errMessages.forEach((mensagem: any) => {
        this.toastr.error(mensagem.Descricao, 'Erro');
      });
    } else {
      this.toastr.error(
        'Não foi possível efetuar o login. Verifique seus dados.',
        'Erro'
      );
    }
  }
}
