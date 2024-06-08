import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserService } from 'src/app/domain/auth/services/user/user.service';
import { GrupoFatura } from '../../interfaces/grupo-fatura.interface';
import { grupoFaturaNotification } from '../../services/grupo-fatura-notification.service';
import { GrupoFaturaService } from '../../services/grupo-fatura.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {
  selectedButton: string = '';
  sidenavExpanded = false;
  isDesktop: boolean = true;

  grupoDefault: number;
  private grupoFaturasSubscriber: Subscription;
  grupoFaturas: GrupoFatura[] = [];

  grupoFaturasForm: FormGroup = new FormGroup({
    grupoFaturaId: new FormControl(),
  });

  constructor(
    private readonly grupoFatura: GrupoFaturaService,
    private readonly grupoFaturaNotification: grupoFaturaNotification,
    private readonly storageService: StorageService,
    private readonly user: UserService,
    private router: Router,
    public readonly titleService: Title
  ) {
    this.updateSelectedButtonFromRoute();
    this.getAllgrupoFaturas();
    this.reloadgrupoFaturas();
    this.setGrupoId();
  }

  ngOnDestroy(): void {
    if (this.grupoFaturasSubscriber) {
      this.grupoFaturasSubscriber.unsubscribe();
    }
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
        } else if (event.urlAfterRedirects.includes('painel')) {
          this.setSelectedButton('painel');
        } else if (event.urlAfterRedirects.includes('conferencia-compras')) {
          this.setSelectedButton('conferencia-compras');
        }
      });
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

  getAllgrupoFaturas() {
    this.grupoFatura.getAll().subscribe({
      next: (grupoFaturas) => {
        this.grupoFaturas = grupoFaturas;
        this.grupoDefault = grupoFaturas[0].id;

        this.inicializeForm();
      },
    });
  }

  reloadgrupoFaturas() {
    this.grupoFaturasSubscriber =
      this.grupoFaturaNotification.realoadgrupoFaturas.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.getAllgrupoFaturas();
          }
        },
      });
  }

  inicializeForm(): void {
    this.grupoFaturasForm.reset({
      grupoFaturaId: this.getGrupoId(),
    });
  }

  getGrupoId(): number {
    let grupoId =
      parseInt(this.storageService.getItem('grupoFaturaId')) ||
      this.grupoDefault;

    let grupo = this.grupoFaturas.find(
      (grupoFatura) => grupoFatura.id === grupoId
    );

    if (grupo == null) {
      return this.grupoDefault;
    }
    return grupoId;
  }

  setGrupoId(): void {
    this.grupoFaturasForm
      .get('grupoFaturaId')
      .valueChanges.subscribe((grupoFaturaId) => {
        const grupoId = parseInt(this.storageService.getItem('grupoFaturaId'));

        const grupoExiste = this.grupoFaturas.some((g) => g.id === grupoId);

        if (grupoId != 0 || grupoExiste) {
          this.storageService.setItem(
            'grupoFaturaId',
            grupoFaturaId.toString()
          );
          this.grupoFaturaNotification.notificarComponentesGrupoIdMudou();
        }
      });
  }
}
