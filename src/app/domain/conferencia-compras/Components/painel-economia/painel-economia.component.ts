import { Component } from '@angular/core';
import { GraficoSugestoesEconomiaComponent } from './grafico-sugestoes-economia/grafico-sugestoes-economia.component';
import { DespesasPorFornecedorComponent } from './media-por-fornecedor/media-por-fornecedor.component';

@Component({
  selector: 'painel-economia',
  templateUrl: './painel-economia.component.html',
  styleUrls: ['./painel-economia.component.scss'],
  standalone: true,
  imports: [DespesasPorFornecedorComponent, GraficoSugestoesEconomiaComponent],
})
export class PainelEconomiaComponent {
  constructor() {}
}
