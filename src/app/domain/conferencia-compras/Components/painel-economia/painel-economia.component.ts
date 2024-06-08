import { Component } from '@angular/core';
import { SugestaoFornecedorComponent } from './sugestao-fornecedor/sugestao-fornecedor.component';
import { GraficoSugestoesEconomiaComponent } from './grafico-sugestoes-economia/grafico-sugestoes-economia.component';



@Component({
  selector: 'painel-economia',
  templateUrl: './painel-economia.component.html',
  styleUrls: ['./painel-economia.component.scss'],
  standalone: true,
  imports: [SugestaoFornecedorComponent, GraficoSugestoesEconomiaComponent],
})
export class PainelEconomiaComponent {
  constructor() {}
}
