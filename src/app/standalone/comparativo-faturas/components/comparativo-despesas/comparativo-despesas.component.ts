import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import { GrupoFaturaSeletorResponse } from 'src/app/core/portal/interfaces/grupo-fatura-seletor-response.interface';
import { GrupoFaturaService } from 'src/app/core/portal/services/grupo-fatura.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ComparativoFaturas } from '../../interfaces/comparativo-fatura.interface';
import { ComparativoFaturaService } from '../../services/comparativo-faturas.service';
import { SelectorFaturasComponent } from '../selector-faturas/selector-faturas.component';
import { SummaryResumoFaturasComponent } from '../summary-resumo-faturas/summary-resumo-faturas.component';

registerLocaleData(localePt);

@Component({
  selector: 'app-comparativo-despesas',
  templateUrl: './comparativo-despesas.component.html',
  styleUrls: ['./comparativo-despesas.component.scss'],
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
export class ComparativoDespesasComponent implements OnInit {
  grupoFaturas: GrupoFaturaSeletorResponse[] = [];
  grupoFaturasForm: FormGroup;

  comparativoFaturas: ComparativoFaturas[] = [];

  totalGrupoFatura1: number = 0;
  totalGrupoFatura2: number = 0;
  totalDifference: number = 0;

  totalDifferencePercentage: number = 0;
  maiorEconomiaCategoria: string = '';
  maiorAumentoCategoria: string = '';

  tooltipMessage: string = '';

  constructor(
    public readonly titleService: Title,
    private readonly storageService: StorageService,
    private readonly fb: FormBuilder,
    private readonly grupoFaturaService: GrupoFaturaService,
    private readonly comparativoFaturasService: ComparativoFaturaService
  ) {
    this.grupoFaturasForm = this.fb.group({
      grupoFaturaCode1: [''],
      grupoFaturaCode2: [''],
    });
  }

  ngOnInit() {
    this.getListGrupoFaturaParaSeletorAsync();
    this.onGrupoFaturaChange();
  }

  //#region Seletor de faturas
  getListGrupoFaturaParaSeletorAsync() {
    const ano = this.storageService.getItem('ano');

    this.grupoFaturaService.getListGrupoFaturaParaSeletorAsync(ano).subscribe({
      next: (grupoFaturas) => {
        this.grupoFaturas = grupoFaturas;

        if (this.grupoFaturas.length > 0) {
          this.grupoFaturasForm.patchValue({
            grupoFaturaCode1: this.grupoFaturas[0].code,
            grupoFaturaCode2:
              this.grupoFaturas.length > 1
                ? this.grupoFaturas[1].code
                : this.grupoFaturas[0].code,
          });
        }
      },
    });
  }
  //#endregion

  //#region Tabela de Comparação de Faturas
  onGrupoFaturaChange() {
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

  getDifferenceColor(
    despesaGrupoFatura1: number,
    despesaGrupoFatura2: number
  ): string {
    const difference = despesaGrupoFatura1 - despesaGrupoFatura2;
    if (difference < 0) {
      return '#0fe400';
    } else if (difference > 0) {
      return 'red';
    } else {
      return '#4e6376';
    }
  }

  getNomeGrupoFatura(groupNumber: number): string {
    const grupoFaturaCode =
      groupNumber === 1
        ? this.grupoFaturasForm.get('grupoFaturaCode1')?.value
        : this.grupoFaturasForm.get('grupoFaturaCode2')?.value;

    const grupoFatura = this.grupoFaturas.find(
      (gf) => gf.code === grupoFaturaCode
    );
    return grupoFatura ? grupoFatura.nome : `Fatura ${groupNumber}`;
  }
  //#endregion
}
