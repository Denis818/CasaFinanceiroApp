import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email!: string;
  public password!: string;
  public showPassword: boolean = false;

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

  public error(arrayMessages: any): void {
    this.spinner.hide();

    if (arrayMessages?.length > 0) {
      arrayMessages.forEach((mensagem: any) => {
        this.toastr.error(mensagem.Descricao, 'Erro');
      });
    } else {
      this.toastr.error(
        'Ocorreu um erro, tente novamente.',
        'Erro'
      );
    }
  }
}
