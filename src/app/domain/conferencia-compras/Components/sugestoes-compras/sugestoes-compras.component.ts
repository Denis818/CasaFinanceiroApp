import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SugestaoEconomiaDespesa } from '../../interfaces/sugestao-economia-despesa';
import { ConferenciaComprasService } from '../../services/conferencia-compras.service';

registerLocaleData(localePt);
@Component({
  selector: 'app-sugestoes-compras',
  templateUrl: './sugestoes-compras.component.html',
  styleUrls: ['./sugestoes-compras.component.scss'],
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
})
export class SugestoesComprasComponent {
  sugestaoEconomiaDespesa: SugestaoEconomiaDespesa[] = [];
  scrollIcon = 'expand_more';

  constructor(private comprasService: ConferenciaComprasService) {
    this.getSugestoesDeOtimizacaoDeDespesas();
  }
  getSugestoesDeOtimizacaoDeDespesas() {
    this.comprasService
      .getSugestoesDeOtimizacaoDeDespesas()
      .subscribe((sugestoes) => {
        this.sugestaoEconomiaDespesa = sugestoes.map((s) => ({
          ...s,
          expanded: false,
        }));
      });
  }

  toggleDetail(index: number) {
    this.sugestaoEconomiaDespesa[index].expanded =
      !this.sugestaoEconomiaDespesa[index].expanded;
  }

  toggleScroll(): void {
    const isScrollingDown = this.scrollIcon === 'expand_more';
    window.scrollTo({
      top: isScrollingDown ? document.body.scrollHeight : 0,
      behavior: 'smooth',
    });
    this.scrollIcon = isScrollingDown ? 'expand_less' : 'expand_more';
  }

  removerPrefixoFatura(nome: string): string {
    const prefixo = 'Fatura de ';
    if (nome.startsWith(prefixo)) {
      return nome.slice(prefixo.length);
    }
    return nome;
  }
}
