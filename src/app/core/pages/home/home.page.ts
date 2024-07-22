import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserService } from 'src/app/domain/auth/services/user/user.service';
import { GrupoFaturaSeletor } from '../../interfaces/grupo-fatura-seletor-interface';
import { grupoFaturaNotification } from '../../services/grupo-fatura-notification.service';
import { GrupoFaturaService } from '../../services/grupo-fatura.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  selectedButton: string = '';
  sidenavExpanded = false;
  isDesktop: boolean = true;

  faturaDefault: number;

  private grupoFaturasSubscriber: Subscription;
  private anoSubscriber: Subscription;
  private grupoFaturaIdSubscriber: Subscription;

  grupoFaturas: GrupoFaturaSeletor[] = [];
  anos: string[] = ['2024', '2025', '2026', '2027'];

  grupoFaturasForm: FormGroup = new FormGroup({
    grupoFaturaId: new FormControl(),
    ano: new FormControl(new Date().getFullYear().toString()),
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
    this.reloadGrupoFaturas();
  }

  ngOnInit(): void {
    this.inicializarValoresDoFormulario();
    this.subscriberMudancasNoFormulario();
    this.getListGrupoFaturaParaSeletorAsync();
  }

  ngOnDestroy(): void {
    if (this.grupoFaturasSubscriber) {
      this.grupoFaturasSubscriber.unsubscribe();
    }
    if (this.anoSubscriber) {
      this.anoSubscriber.unsubscribe();
    }
    if (this.grupoFaturaIdSubscriber) {
      this.grupoFaturaIdSubscriber.unsubscribe();
    }
  }

  //#region Select Grupos Faturas

  inicializarValoresDoFormulario(): void {
    const anoSalvo =
      this.storageService.getItem('ano') || new Date().getFullYear().toString();

    const grupoFaturaIdSalvo =
      parseInt(this.storageService.getItem('grupoFaturaId')) || null;

    this.grupoFaturasForm.patchValue(
      {
        ano: anoSalvo,
        grupoFaturaId: grupoFaturaIdSalvo,
      },
      { emitEvent: false }
    );
  }

  subscriberMudancasNoFormulario(): void {
    this.anoSubscriber = this.grupoFaturasForm
      .get('ano')
      .valueChanges.subscribe((ano) => {
        this.storageService.setItem('ano', ano.toString());
        this.getListGrupoFaturaParaSeletorAsync();
        this.grupoFaturaNotification.atualizarAnoSelecionado(ano);
      });

    this.grupoFaturaIdSubscriber = this.grupoFaturasForm
      .get('grupoFaturaId')
      .valueChanges.subscribe(() => {
        this.updateGrupoIdInStorage();
      });
  }

  getListGrupoFaturaParaSeletorAsync() {
    this.grupoFatura
      .getListGrupoFaturaParaSeletorAsync(
        this.grupoFaturasForm.get('ano').value
      )
      .subscribe({
        next: (grupoFaturas) => {
          this.grupoFaturas = grupoFaturas;
          this.faturaDefault = grupoFaturas[0]?.id;

          this.grupoFaturasForm.patchValue(
            {
              grupoFaturaId: this.getGrupoId(),
            },
            { emitEvent: false }
          );

          this.updateGrupoIdInStorage();
        },
      });
  }

  getGrupoId(): number {
    let grupoId =
      parseInt(this.storageService.getItem('grupoFaturaId')) ||
      this.faturaDefault;

    let grupo = this.grupoFaturas.find(
      (grupoFatura) => grupoFatura.id === grupoId
    );

    if (grupo == null) {
      return this.faturaDefault;
    }
    return grupoId;
  }

  updateGrupoIdInStorage(): void {
    let grupoFaturaId = this.grupoFaturasForm.get('grupoFaturaId').value;
    if (grupoFaturaId) {
      this.storageService.setItem('grupoFaturaId', grupoFaturaId.toString());
      this.grupoFaturaNotification.notificarComponentesGrupoIdMudou();
    }
  }
  //#endregion

  //#region Sidnav

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
        } else if (event.urlAfterRedirects.includes('painel')) {
          this.setSelectedButton('painel');
        } else if (event.urlAfterRedirects.includes('conferencia-compras')) {
          this.setSelectedButton('conferencia-compras');
        }
      });
  }

  logout() {
    this.user.logout();
  }
  //#endregion

  reloadGrupoFaturas() {
    this.grupoFaturasSubscriber =
      this.grupoFaturaNotification.realoadgrupoFaturas.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.getListGrupoFaturaParaSeletorAsync();
          }
        },
      });
  }
}
