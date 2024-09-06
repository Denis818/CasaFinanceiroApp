import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Input, LOCALE_ID, OnChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComparativoFaturas } from '../../interfaces/comparativo-fatura.interface';

registerLocaleData(localePt);

@Component({
  selector: 'app-summary-resumo-faturas',
  templateUrl: './summary-resumo-faturas.component.html',
  styleUrls: ['./summary-resumo-faturas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class SummaryResumoFaturasComponent implements OnChanges {
  @Input() comparativoFaturas: ComparativoFaturas[] = [];
  @Input() totalGrupoFatura1: number = 0;
  @Input() totalGrupoFatura2: number = 0;

  totalDifferencePercentage: number = 0;
  maiorEconomiaCategoria: string = '';
  maiorAumentoCategoria: string = '';
  tooltipMessage: string = '';

  ngOnChanges() {
    this.initSummary();
  }

  initSummary() {
    this.tooltipMessage = `Mostra em porcentagem o quanto ${this.getNomeGrupoFatura(
      1
    )} gastou a mais em comparação com o ${this.getNomeGrupoFatura(2)}.`;

    this.totalDifferencePercentage = this.calculateTotalDifferencePercentage(
      this.totalGrupoFatura1,
      this.totalGrupoFatura2
    );

    this.maiorEconomiaCategoria = this.findMaiorEconomia();
    this.maiorAumentoCategoria = this.findMaiorAumento();
  }

  calculateTotalDifferencePercentage(total1: number, total2: number): number {
    if (total2 === 0) {
      return 0;
    }
    return ((total1 - total2) / total2) * 100;
  }

  findMaiorEconomia(): string {
    let maiorEconomia = { categoria: '', valor: 0 };

    this.comparativoFaturas.forEach((item) => {
      const diferenca = item.despesaGrupoFatura2 - item.despesaGrupoFatura1;
      if (diferenca > maiorEconomia.valor) {
        maiorEconomia = { categoria: item.categoria, valor: diferenca };
      }
    });

    return maiorEconomia.categoria ? maiorEconomia.categoria : 'Nenhum';
  }

  findMaiorAumento(): string {
    let maiorAumento = { categoria: '', valor: 0 };

    this.comparativoFaturas.forEach((item) => {
      const diferenca = item.despesaGrupoFatura1 - item.despesaGrupoFatura2;
      if (diferenca > maiorAumento.valor) {
        maiorAumento = { categoria: item.categoria, valor: diferenca };
      }
    });

    return maiorAumento.categoria ? maiorAumento.categoria : 'Nenhum';
  }

  getNomeGrupoFatura(groupNumber: number): string {
    return groupNumber === 1 ? 'Fatura 1' : 'Fatura 2';
  }
}
