import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { grupoFaturaNotification } from 'src/app/core/services/grupo-fatura-notification.service';
import { GrupoFaturaService } from 'src/app/core/services/grupo-fatura.service';
import { MensagemWhatsAppComponent } from 'src/app/domain/painel-controle/components/modais/mensagem-whatsapp/mensagem-whatsapp.component';
import { GraphicComponent } from 'src/app/shared/components/graphic/graphic-component/graphic.component';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { GraphicMobile } from 'src/app/shared/components/graphic/interfaces/graphic-mobile.interface';
import {
  EnumFaturaType,
  EnumStatusFatura,
} from 'src/app/shared/enums/enum-filtro-despesa';
import { DespesaPorMembroResponse } from '../../interfaces/financy/despesa-por-membro-response.interface';
import { RelatorioGastosDoGrupoResponse } from '../../interfaces/financy/relatorio-gastos-grupo-response.interface';
import { TotalPorCategoriaResponse } from '../../interfaces/financy/total-por-categoria-response.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  imports: [
    CommonModule,
    GraphicComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    FormsModule,
  ],
})
export class DashboardPage implements OnInit, OnDestroy {
  scrollIcon = 'expand_more';

  statusFaturaCasa: string;
  statusFaturaMoradia: string;
  casa: EnumFaturaType = EnumFaturaType.Casa;
  moradia: EnumFaturaType = EnumFaturaType.Moradia;

  private reloadPageSubscriber: Subscription;

  despesasPorMembros: DespesaPorMembroResponse[] = [];
  listDespesasPorCategoria: TotalPorCategoriaResponse[] = [];

  relatorioGastosDoGrupo: RelatorioGastosDoGrupoResponse = {
    grupoFaturaNome: '',
    totalGastosMoradia: 0,
    totalGastosCasa: 0,
    totalGeral: 0,
  };

  graphicConfig: GraphicConfiguration;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly grupoFaturaService: GrupoFaturaService,
    private readonly dialog: MatDialog,
    private readonly grupoFaturaNotification: grupoFaturaNotification
  ) {}

  ngOnInit() {
    this.reloadPage();
  }

  ngOnDestroy() {
    if (this.reloadPageSubscriber) {
      this.reloadPageSubscriber.unsubscribe();
    }
  }

  atualizarStatusFatura() {
    this.getStatusFatura(EnumStatusFatura.CasaAberto);
    this.getStatusFatura(EnumStatusFatura.MoradiaAberto);
  }

  getStatusFatura(status: EnumStatusFatura) {
    this.grupoFaturaService
      .getStatusFaturaByName(status as EnumStatusFatura)
      .subscribe({
        next: (statusFatura) => {
          if (status.includes('Casa')) {
            this.statusFaturaCasa =
              statusFatura.estado === EnumStatusFatura.CasaAberto
                ? 'aberto'
                : 'fechado';
          } else {
            this.statusFaturaMoradia =
              statusFatura.estado === EnumStatusFatura.MoradiaAberto
                ? 'aberto'
                : 'fechado';
          }
        },
      });
  }

  onStatusChange(faturaType: EnumFaturaType) {
    let statusFatura: EnumStatusFatura;

    if (faturaType === EnumFaturaType.Casa) {
      statusFatura =
        this.statusFaturaCasa === 'aberto'
          ? EnumStatusFatura.CasaAberto
          : EnumStatusFatura.CasaFechado;
    } else {
      statusFatura =
        this.statusFaturaMoradia === 'aberto'
          ? EnumStatusFatura.MoradiaAberto
          : EnumStatusFatura.MoradiaFechado;
    }

    this.grupoFaturaService
      .updateStatusFatura(faturaType, statusFatura)
      .subscribe({
        error: (error) => {
          const unauthorized = error?.error?.mensagens.some(
            (result: any) => result.statusCode === 401
          );

          if (!unauthorized) {
            this.atualizarStatusFatura();
          }
        },
      });
  }

  reloadPage() {
    this.reloadPageSubscriber =
      this.grupoFaturaNotification.recarregarPaginaComNovoGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.inicializeDashboard();
            this.atualizarStatusFatura();
          }
        },
      });
  }

  inicializeDashboard() {
    this.getGraficoTotaisComprasPorMes();
    this.getTotalPorCategoria();
    this.getAnaliseDesesasPorGrupo();
  }

  getGraficoTotaisComprasPorMes() {
    this.dashboardService.getGraficoTotaisComprasPorGrupo().subscribe({
      next: (graphicConfig) => {
        this.graphicConfig = graphicConfig;
      },
    });
  }

  getAnaliseDesesasPorGrupo() {
    this.dashboardService.getAnaliseDesesasPorGrupo().subscribe((dados) => {
      this.despesasPorMembros = dados.despesasPorMembro;
      this.relatorioGastosDoGrupo = dados.relatorioGastosDoGrupo;
    });
  }

  getTotalPorCategoria() {
    this.dashboardService.getTotalPorCategoria().subscribe((dados) => {
      this.listDespesasPorCategoria = dados;
    });
  }

  downloadRelatorioDespesasHabitacional() {
    this.dashboardService.downloadRelatorioDespesasHabitacional();
  }

  downloadRelatorioDespesasCasa() {
    this.dashboardService.downloadRelatorioDespesasCasa();
  }

  openMensagemWhatsAppModal(nome: string, isHabitacional: boolean): void {
    this.dialog.open(MensagemWhatsAppComponent, {
      width: '500px',
      data: { nome: nome, isHabitacional: isHabitacional },
    });
  }

  toggleScroll(): void {
    const isScrollingDown = this.scrollIcon === 'expand_more';
    window.scrollTo({
      top: isScrollingDown ? document.body.scrollHeight : 0,
      behavior: 'smooth',
    });
    this.scrollIcon = isScrollingDown ? 'expand_less' : 'expand_more';
  }
}
