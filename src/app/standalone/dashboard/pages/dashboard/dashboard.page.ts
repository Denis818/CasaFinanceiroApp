import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {
  AfterViewInit,
  Component,
  LOCALE_ID,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { EnumFaturaType } from 'src/app/core/portal/enums/enum-fatura-type';
import { EnumStatusFatura } from 'src/app/core/portal/enums/enum-status-fatura';
import { GrupoFaturaNotification } from 'src/app/core/portal/services/grupo-fatura-notification.service';
import { GrupoFaturaService } from 'src/app/core/portal/services/grupo-fatura.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { MensagemWhatsAppComponent } from 'src/app/standalone/dashboard/components/mensagem-whatsapp/mensagem-whatsapp.component';
import { GraficoTotalGrupoFaturaComponent } from '../../components/grafico-total-grupo-fatura/grafico-total-grupo-fatura.component';
import { TableDespesasPorCategoriaComponent } from '../../components/table-despesas-por-categoria/table-despesas-por-categoria.component';
import { DespesaPorMembroResponse } from '../../interfaces/despesa-por-membro-response.interface';
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
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    FormsModule,
    GraficoTotalGrupoFaturaComponent,
    TableDespesasPorCategoriaComponent,
  ],
})
export class DashboardPage implements AfterViewInit, OnDestroy {
  @ViewChild(GraficoTotalGrupoFaturaComponent)
  graficoTotalGrupoFaturaComponent: GraficoTotalGrupoFaturaComponent;

  @ViewChild(TableDespesasPorCategoriaComponent)
  tableDespesasPorCategoriaComponent: TableDespesasPorCategoriaComponent;

  scrollIcon = 'expand_more';

  statusFaturaCasa: string;
  statusFaturaMoradia: string;
  casa: EnumFaturaType = EnumFaturaType.Casa;
  moradia: EnumFaturaType = EnumFaturaType.Moradia;

  private reloadPageSubscriber: Subscription;

  despesasPorMembros: DespesaPorMembroResponse[] = [];

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly grupoFaturaService: GrupoFaturaService,
    private readonly dialog: MatDialog,
    private readonly grupoFaturaNotification: GrupoFaturaNotification,
    private readonly storageService: StorageService,
    public readonly titleService: Title
  ) {}

  ngAfterViewInit() {
    this.reloadPage();
  }

  ngOnDestroy() {
    this.reloadPageSubscriber?.unsubscribe();
  }

  reloadPage() {
    this.reloadPageSubscriber?.unsubscribe();

    this.reloadPageSubscriber =
      this.grupoFaturaNotification.recarregarPaginaComNovoGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.carregarDados();
          }
        },
      });
  }

  carregarDados() {
    if (this.grupoFaturaService.hasFaturaCode()) {
      const ano =
        this.storageService.getItem('ano') ||
        new Date().getFullYear().toString();

      this.dashboardService.getDashboardData(ano).subscribe({
        next: (data) => {
          this.despesasPorMembros =
            data.despesasDivididasMensal.despesasPorMembro;

          this.graficoTotalGrupoFaturaComponent?.atualizarGrafico(
            data.despesaGrupoParaGrafico
          );

          this.tableDespesasPorCategoriaComponent?.getTotalPorCategoria();

          this.atualizarStatusFatura();
        },
        error: (err) => console.error(err),
      });
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

  exportarRelatorioDespesasHabitacional() {
    this.dashboardService.exportarRelatorioDespesasHabitacional();
  }

  exportarRelatorioDespesasCasa() {
    this.dashboardService.exportarRelatorioDespesasCasa();
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
