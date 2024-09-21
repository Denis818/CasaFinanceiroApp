import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { GrupoFaturaNotification } from 'src/app/core/portal/services/grupo-fatura-notification.service';
import { TemaCorNotification } from 'src/app/core/portal/services/tema-cor-notification.service';
import { GraphicComponent } from 'src/app/shared/components/graphic/graphic-component/graphic.component';
import { GraphicConfiguration } from 'src/app/shared/components/graphic/interfaces/graphic-configuration.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-grafico-total-grupo-fatura',
  templateUrl: './grafico-total-grupo-fatura.component.html',
  styleUrls: ['./grafico-total-grupo-fatura.component.scss'],
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
export class GraficoTotalGrupoFaturaComponent implements OnInit, OnDestroy {
  graphicConfig: GraphicConfiguration;

  private reloadComponentSubscriber: Subscription;
  private temaCorNotificationSubscriber: Subscription;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly grupoFaturaNotification: GrupoFaturaNotification,
    private temaCorNotification: TemaCorNotification
  ) {}

  ngOnInit(): void {
    this.reloadComponent();
  }

  ngOnDestroy() {
    this.reloadComponentSubscriber?.unsubscribe();
    this.temaCorNotificationSubscriber?.unsubscribe();
  }

  reloadComponent() {
    this.temaCorNotificationSubscriber =
      this.temaCorNotification.recarregarComponentComNovoTema.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.getGraficoTotaisComprasPorMes();
          }
        },
      });

    this.reloadComponentSubscriber =
      this.grupoFaturaNotification.recarregarPaginaComNovoGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.getGraficoTotaisComprasPorMes();
          }
        },
      });
  }

  getGraficoTotaisComprasPorMes() {
    this.dashboardService.getGraficoTotaisComprasPorGrupo().subscribe({
      next: (graphicConfig) => {
        this.graphicConfig = graphicConfig;
      },
    });
  }
}
