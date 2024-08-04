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
import { GraphicComponent } from 'src/app/shared/components/graphic/graphic-component/graphic.component';
import { TotalPorCategoriaResponse } from '../../interfaces/total-por-categoria-response.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';
registerLocaleData(localePt);

@Component({
  selector: 'app-table-despesas-por-categoria',
  templateUrl: './table-despesas-por-categoria.component.html',
  styleUrls: ['./table-despesas-por-categoria.component.scss'],
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
export class TableDespesasPorCategoriaComponent implements OnInit, OnDestroy {
  listDespesasPorCategoria: TotalPorCategoriaResponse[] = [];
  private reloadComponentSubscriber: Subscription;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly grupoFaturaNotification: GrupoFaturaNotification
  ) {}

  ngOnInit(): void {
    this.reloadComponent();
  }

  ngOnDestroy() {
    if (this.reloadComponentSubscriber) {
      this.reloadComponentSubscriber.unsubscribe();
    }
  }

  reloadComponent() {
    this.reloadComponentSubscriber =
      this.grupoFaturaNotification.recarregarPaginaComNovoGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            console.log('categorfias aquiiii');
            this.getTotalPorCategoria();
          }
        },
      });
  }

  getTotalPorCategoria() {
    this.dashboardService.getTotalPorCategoria().subscribe((dados) => {
      this.listDespesasPorCategoria = dados;
    });
  }
}
