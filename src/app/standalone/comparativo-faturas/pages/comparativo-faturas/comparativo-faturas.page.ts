import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { GrupoFaturaSeletorResponse } from 'src/app/core/portal/interfaces/grupo-fatura-seletor-response.interface';
import { ComparativoDespesasComponent } from '../../components/comparativo-despesas/table-comparativo-despesas.component';
import { SelectorFaturasComponent } from '../../components/selector-faturas/selector-faturas.component';
import { SummaryResumoFaturasComponent } from '../../components/summary-resumo-faturas/summary-resumo-faturas.component';
import { ComparativoFaturas } from '../../interfaces/comparativo-fatura.interface';
import { ComparativoFaturaService } from '../../services/comparativo-faturas.service';

registerLocaleData(localePt);
@Component({
  selector: 'app-comparativo-faturas',
  templateUrl: './comparativo-faturas.page.html',
  styleUrls: ['./comparativo-faturas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SelectorFaturasComponent,
    ComparativoDespesasComponent,
    SummaryResumoFaturasComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ComparativoFaturasPage {
  grupoFaturas: GrupoFaturaSeletorResponse[] = [];
  grupoFaturasForm: FormGroup;

  comparativoFaturas: ComparativoFaturas[] = [];

  totalGrupoFatura1: number = 0;
  totalGrupoFatura2: number = 0;
  totalDifference: number = 0;

  totalDifferencePercentage: number = 0;
  maiorEconomiaCategoria: string = '';
  maiorAumentoCategoria: string = '';

  nomeGrupoFatura1: string = '';
  nomeGrupoFatura2: string = '';

  constructor(
    public readonly titleService: Title,
    private readonly fb: FormBuilder,
    private readonly comparativoFaturasService: ComparativoFaturaService
  ) {
    this.grupoFaturasForm = this.fb.group({
      grupoFaturaCode1: [''],
      grupoFaturaCode2: [''],
    });
  }

  ngOnInit(): void {
    this.getComparativoFaturas();
  }

  getComparativoFaturas() {
    this.grupoFaturasForm.valueChanges.subscribe((values) => {
      const grupoFaturaCode1 = values.grupoFaturaCode1;
      const grupoFaturaCode2 = values.grupoFaturaCode2;

      if (grupoFaturaCode1 && grupoFaturaCode2) {
        this.comparativoFaturasService
          .getComparativoFaturas(grupoFaturaCode1, grupoFaturaCode2)
          .subscribe((comparativoFaturas) => {
            this.comparativoFaturas = comparativoFaturas;

            this.totalGrupoFatura1 = this.calcularTotalDespesasPorGroupo(1);
            this.totalGrupoFatura2 = this.calcularTotalDespesasPorGroupo(2);
            this.totalDifference =
              this.totalGrupoFatura1 - this.totalGrupoFatura2;

            this.getNomesGruposFaturas();
          });
      }
    });
  }

  calcularTotalDespesasPorGroupo(groupNumber: number): number {
    return this.comparativoFaturas.reduce((total, despesa) => {
      if (groupNumber === 1) {
        return total + despesa.despesaGrupoFatura1;
      } else if (groupNumber === 2) {
        return total + despesa.despesaGrupoFatura2;
      }
      return total;
    }, 0);
  }

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

  getNomesGruposFaturas() {
    const grupoFaturaCode1 =
      this.grupoFaturasForm.get('grupoFaturaCode1')?.value;
    const grupoFaturaCode2 =
      this.grupoFaturasForm.get('grupoFaturaCode2')?.value;

    const grupoFatura1 = this.grupoFaturas.find(
      (gf) => gf.code === grupoFaturaCode1
    );
    const grupoFatura2 = this.grupoFaturas.find(
      (gf) => gf.code === grupoFaturaCode2
    );

    this.nomeGrupoFatura1 = grupoFatura1 ? grupoFatura1.nome : 'Fatura 1';
    this.nomeGrupoFatura2 = grupoFatura2 ? grupoFatura2.nome : 'Fatura 2';
  }

  getListGruposFaturasParaSeletor(grupoFaturas: GrupoFaturaSeletorResponse[]) {
    this.grupoFaturas = grupoFaturas;
  }
}
