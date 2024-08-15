import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { EnumTipoMetrica } from 'src/app/standalone/control-panel/enums/enum-tipo-metrica';
import { ParametroAlertaGastos } from 'src/app/standalone/control-panel/interfaces/parametro-alerta-gastos.interface';
import { RelatorioGastosDoGrupoResponse } from 'src/app/standalone/control-panel/interfaces/relatorio-gastos-grupo-response.interface';
import { DespesaService } from 'src/app/standalone/control-panel/services/despesa.service';
import { CardDescricaoTotaisComponent } from '../card-descricao-totais/card-descricao-totais.component';

registerLocaleData(localePt);

@Component({
  selector: 'app-card-totais-list-despesas',
  templateUrl: './card-totais-list-despesas.component.html',
  styleUrls: ['./card-totais-list-despesas.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    CurrencyMaskModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
})
export class CardTotaisListDespesasComponent implements OnInit {
  parametrosGastos: ParametroAlertaGastos[] = [];

  relatorioGastosDoGrupo: RelatorioGastosDoGrupoResponse = {
    grupoFaturaNome: '',
    totalGastosMoradia: 0,
    totalGastosCasa: 0,
    totalGeral: 0,
  };

  enumTipoMetricas: EnumTipoMetrica[] = [
    EnumTipoMetrica.casa,
    EnumTipoMetrica.moradia,
    EnumTipoMetrica.geral,
  ];

  constructor(
    private readonly despesaService: DespesaService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getParametrosDeAlertasDeGastos();
  }

  getParametrosDeAlertasDeGastos() {
    this.despesaService
      .getParametrosDeAlertasDeGastos()
      .subscribe((parametros) => {
        this.parametrosGastos = parametros;

        this.getRelatorioDeGastosDoGrupo();
      });
  }

  getRelatorioDeGastosDoGrupo() {
    this.despesaService
      .getRelatorioDeGastosDoGrupo()
      .subscribe((relatorioGastosDoGrupo) => {
        this.relatorioGastosDoGrupo = relatorioGastosDoGrupo;
      });
  }

  getStyle(
    valor: number,
    tipoMetrica: EnumTipoMetrica
  ): { [key: string]: string } {
    const metrica = this.parametrosGastos.find(
      (m) => m.tipoMetrica === tipoMetrica
    );

    if (!metrica) {
      return {};
    }

    if (valor > metrica.limiteVermelho) {
      return { color: 'red' };
    } else if (valor >= metrica.limiteAmarelo) {
      return { color: '#e5bd00' };
    } else {
      return {};
    }
  }

  openEditMetricasModal(): void {
    this.dialog.open(CardDescricaoTotaisComponent, {
      height: '220px',
    });
  }
}
