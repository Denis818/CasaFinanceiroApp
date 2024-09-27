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

  @Input() nomeGrupoFatura1: string = '';
  @Input() nomeGrupoFatura2: string = '';

  totalDifferencePercentage: number = 0;
  maiorEconomiaCategoria: string = '';
  maiorAumentoCategoria: string = '';
  tooltipMessage: string = '';

  ngOnChanges() {
    this.initSummary();
  }

  initSummary() {
    this.tooltipMessage = `
    Mostra em porcentagem o quanto ${this.nomeGrupoFatura1} gastou a mais em comparação com a ${this.nomeGrupoFatura2}.`;

    this.totalDifferencePercentage = this.calculateDifferencePercentage(
      this.totalGrupoFatura1,
      this.totalGrupoFatura2
    );

    this.maiorEconomiaCategoria = this.findMaiorEconomia();
    this.maiorAumentoCategoria = this.findMaiorAumento();
  }

  calculateDifferencePercentage(total1: number, total2: number): number {
    if (total2 === 0) {
      return 0;
    }
    return ((total1 - total2) / total2) * 100;
  }

  getDifferencePercentage(): number {
    return Math.abs(this.totalDifferencePercentage);
  }

  messageDifferencePercentage(): string {
    if (this.totalDifferencePercentage > 0) {
      return 'a mais';
    } else if (this.totalDifferencePercentage < 0) {
      return `a menos`;
    } else {
      return '';
    }
  }

  getDifferenceColor(): string {
    if (this.totalDifferencePercentage > 0) {
      return 'red';
    } else if (this.totalDifferencePercentage < 0) {
      return '#0fe400';
    } else {
      return '#4e6376';
    }
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
}
