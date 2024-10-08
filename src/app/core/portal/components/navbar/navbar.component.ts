import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/modules/auth/services/user/user.service';
import { MetricasNotification } from 'src/app/standalone/control-panel/components/listing-components/despesas/card-descricao-totais/metricas-notification.service';
import { GrupoFaturaSeletorResponse } from '../../interfaces/grupo-fatura-seletor-response.interface';
import { GrupoFaturaNotification } from '../../services/grupo-fatura-notification.service';
import { GrupoFaturaService } from '../../services/grupo-fatura.service';
import { TemaCorNotification } from '../../services/tema-cor-notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  darkMode: boolean = true;
  selectedTheme: string;

  faturaDefaultCode: string;

  private grupoFaturasSubscriber: Subscription;
  private anoSubscriber: Subscription;
  private grupoFaturaCodeSubscriber: Subscription;

  grupoFaturas: GrupoFaturaSeletorResponse[] = [];
  anos: string[] = ['2024', '2025', '2026', '2027'];

  grupoFaturasForm: FormGroup = new FormGroup({
    grupoFaturaCode: new FormControl(),
    ano: new FormControl(new Date().getFullYear().toString()),
  });

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private renderer: Renderer2,
    private readonly grupoFatura: GrupoFaturaService,
    private readonly grupoFaturaNotification: GrupoFaturaNotification,
    private metricasNotification: MetricasNotification,
    private readonly storageService: StorageService,
    private readonly user: UserService,
    public readonly titleService: Title,
    private temaCorNotification: TemaCorNotification
  ) {}

  ngOnInit(): void {
    this.setTheme();
    this.inicializarValoresDoFormulario();
    this.subscriberMudancasNoFormulario();
    this.atualizarAnoEGruposFatura();

    this.reloadGrupoFaturaParaSeletor();
  }

  ngOnDestroy(): void {
    this.grupoFaturasSubscriber?.unsubscribe();
    this.anoSubscriber?.unsubscribe();
    this.grupoFaturaCodeSubscriber?.unsubscribe();
  }

  //#region Select Grupos Faturas

  inicializarValoresDoFormulario(): void {
    const anoSalvo =
      this.storageService.getItem('ano') || new Date().getFullYear().toString();

    const grupoFaturaCodeSalvo =
      this.storageService.getItem('grupo-fatura-code') || null;

    this.grupoFaturasForm.patchValue(
      {
        ano: anoSalvo,
        grupoFaturaCode: grupoFaturaCodeSalvo,
      },
      { emitEvent: false }
    );
  }

  subscriberMudancasNoFormulario(): void {
    this.anoSubscriber = this.grupoFaturasForm
      .get('ano')
      .valueChanges.subscribe(() => {
        this.atualizarAnoEGruposFatura();
      });

    this.grupoFaturaCodeSubscriber = this.grupoFaturasForm
      .get('grupoFaturaCode')
      .valueChanges.subscribe(() => {
        this.updateGrupoIdInStorage();
      });
  }

  getListGrupoFaturaParaSeletor() {
    this.grupoFatura
      .getListGrupoFaturaParaSeletor(
        this.grupoFaturasForm.get('ano').value
      )
      .subscribe({
        next: (grupoFaturas) => {
          this.grupoFaturas = grupoFaturas;
          this.faturaDefaultCode = grupoFaturas[0]?.code;

          this.grupoFaturasForm.patchValue(
            {
              grupoFaturaCode: this.getGrupoCode(),
            },
            { emitEvent: false }
          );

          this.updateGrupoIdInStorage();
        },
      });
  }

  getGrupoCode(): string {
    let grupoCode =
      this.storageService.getItem('grupo-fatura-code') ||
      this.faturaDefaultCode;

    let grupo = this.grupoFaturas.find(
      (grupoFatura) => grupoFatura.code === grupoCode
    );

    if (grupo == null) {
      return this.faturaDefaultCode;
    }
    return grupoCode;
  }

  atualizarAnoEGruposFatura() {
    let ano = this.grupoFaturasForm.get('ano').value;

    if (ano && ano > 0) {
      this.storageService.setItem('ano', ano.toString());
      this.grupoFaturaNotification.notificarComponentesAnoMudou();
    }

    this.getListGrupoFaturaParaSeletor();
  }

  updateGrupoIdInStorage(): void {
    let grupoFaturaCode = this.grupoFaturasForm.get('grupoFaturaCode').value;

    if (grupoFaturaCode) {
      this.storageService.setItem(
        'grupo-fatura-code',
        grupoFaturaCode.toString()
      );
      this.grupoFaturaNotification.notificarComponentesGrupoIdMudou();
      this.metricasNotification.notificarCardTotaisMetricaMudou();
    } else {
    }
  }
  //#endregion

  //#region Tema do site
  setTheme() {
    this.selectedTheme =
      this.storageService.getItem('selectedTheme') || 'roxo-theme';

    this.applyTheme(this.selectedTheme);
  }

  onThemeChange(event: any): void {
    const theme = event.value;
    this.applyTheme(theme);
    this.temaCorNotification.notificarComponentesTemaMudou();
  }

  applyTheme(theme: string): void {
    this.renderer.removeClass(this.document.body, 'roxo-theme');
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.removeClass(this.document.body, 'azul-theme');

    this.renderer.addClass(this.document.body, theme);
    this.storageService.setItem('selectedTheme', theme);
  }
  //#endregion

  reloadGrupoFaturaParaSeletor() {
    this.grupoFaturasSubscriber =
      this.grupoFaturaNotification.recarregarSeletorGrupoFaturaComAlteracoes.subscribe(
        {
          next: (isReload) => {
            if (isReload) {
              this.getListGrupoFaturaParaSeletor();
            }
          },
        }
      );
  }

  logout() {
    this.user.logout();
  }
}
