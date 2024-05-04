import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/domain/auth/services/user/user.service';
import { GrupoDespesa } from '../../interfaces/grupo-despesa.interface';
import { HomeService } from '../../services/home/home-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  selectedButton: string = 'dashboard';
  sidenavExpanded = false;
  isDesktop: boolean = true;

  grupoDefault: number;
  grupoDespesas: GrupoDespesa[] = [];
  grupoDespesasForm: FormGroup = new FormGroup({
    grupoDespesaId: new FormControl(),
  });

  constructor(
    private readonly homeService: HomeService,
    private readonly user: UserService,
    public readonly titleService: Title
  ) {
    this.getAllGrupoDespesas();
  }

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

  getAllGrupoDespesas() {
    this.homeService.getAll().subscribe({
      next: (grupoDespesas) => {
        this.grupoDespesas = grupoDespesas;
        this.grupoDefault = grupoDespesas.length > 0 ? grupoDespesas[0].id : 0;

        this.inicializeForm();
      },
    });
  }

  inicializeForm(): void {
    this.grupoDespesasForm.reset({
      grupoDespesaId:
        this.grupoDespesasForm.value.grupoDespesaId || this.grupoDefault,
    });
  }
}
