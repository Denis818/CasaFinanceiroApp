import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Input, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComparativoFaturas } from '../../interfaces/comparativo-fatura.interface';
import { SelectorFaturasComponent } from '../selector-faturas/selector-faturas.component';
import { SummaryResumoFaturasComponent } from '../summary-resumo-faturas/summary-resumo-faturas.component';

registerLocaleData(localePt);

@Component({
  selector: 'app-table-comparativo-despesas',
  templateUrl: './table-comparativo-despesas.component.html',
  styleUrls: ['./table-comparativo-despesas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SelectorFaturasComponent,
    SummaryResumoFaturasComponent,
    SelectorFaturasComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ComparativoDespesasComponent {
  @Input() comparativoFaturas: ComparativoFaturas[] = [];
  @Input() totalGrupoFatura1: number = 0;
  @Input() totalGrupoFatura2: number = 0;
  @Input() nomeGrupoFatura1: string = '';
  @Input() nomeGrupoFatura2: string = '';

  getDifference(item: any): { value: number; message: string; color: string } {
    const difference = item.despesaGrupoFatura1 - item.despesaGrupoFatura2;
    let message = '';
    let color = '#4e6376';

    if (difference > 0) {
      message = 'a mais';
      color = 'red';
    } else if (difference < 0) {
      message = 'a menos';
      color = '#0fe400';
    }

    return { value: Math.abs(difference), message, color };
  }
}
