import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/core/services/home/home-service';
import { GraphicComponent } from 'src/app/shared/components/graphic/graphic-component/graphic.component';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { GraphicMobile } from 'src/app/shared/components/graphic/interfaces/graphic-mobile.interface';
import { DespesaPorMembroResponse } from '../../interfaces/financy/despesa-por-membro-response.interface';
import { RelatorioGastosDoGrupoResponse } from '../../interfaces/financy/relatorio-gastos-grupo-response.interface';
import { TotalPorCategoriaResponse } from '../../interfaces/financy/total-por-categoria-response.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { MensagemWhatsAppModal } from 'src/app/domain/painel-controle/modais/utilities/mensagem-whatsapp/mensagem-whatsapp.modal';

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
  ],
})
export class DashboardPage implements OnInit, OnDestroy {
  scrollIcon = 'expand_more';

  private reloadPageSubscriber: Subscription;

  despesasPorMembros: DespesaPorMembroResponse[] = [];
  listDespesasPorCategoria: TotalPorCategoriaResponse[] = [];

  relatorioGastosDoGrupo: RelatorioGastosDoGrupoResponse = {
    grupoDespesaNome: '',
    totalGastosMoradia: 0,
    totalGastosCasa: 0,
    totalGeral: 0,
  };

  graphicConfig: GraphicConfiguration;
  graphicMobile: GraphicMobile = {
    graphicType: 'bar',
    width: 330,
    height: 290,
  };

  constructor(
    private readonly dashboardService: DashboardService,
    private dialog: MatDialog,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.inicializeDashboard();
    this.reloadPage();
  }

  ngOnDestroy() {
    if (this.reloadPageSubscriber) {
      this.reloadPageSubscriber.unsubscribe();
    }
  }

  reloadPage() {
    this.reloadPageSubscriber =
      this.homeService.reloadPageWithNewGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.inicializeDashboard();
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
    this.dialog.open(MensagemWhatsAppModal, {
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
