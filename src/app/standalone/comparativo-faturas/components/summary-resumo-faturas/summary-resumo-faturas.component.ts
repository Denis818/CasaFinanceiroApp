import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

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
export class SummaryResumoFaturasComponent implements OnInit {
  @Input() tooltipMessage: string;
  @Input() totalDifferencePercentage: number;
  @Input() maiorEconomiaCategoria: string;
  @Input() maiorAumentoCategoria: string;
  constructor() {}

  ngOnInit() {}
}
