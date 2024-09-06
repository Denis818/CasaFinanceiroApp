import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { ComparativoDespesasComponent } from '../../components/comparativo-despesas/comparativo-despesas.component';

registerLocaleData(localePt);
@Component({
  selector: 'app-comparativo-faturas',
  templateUrl: './comparativo-faturas.page.html',
  styleUrls: ['./comparativo-faturas.page.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, ComparativoDespesasComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ComparativoFaturasPage {
  constructor(public readonly titleService: Title) {}
}
