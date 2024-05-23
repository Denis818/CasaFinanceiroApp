import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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
export class SugestoesComprasComponent implements OnInit {
  sugestoesDeCompras: string[] = [];
  scrollIcon = 'expand_more';

  constructor(private comprasService: ConferenciaComprasService) {
    this.getSugestoesDeOtimizacaoDeDespesas();
  }

  ngOnInit() {}

  getSugestoesDeOtimizacaoDeDespesas() {
    this.comprasService
      .getSugestoesDeOtimizacaoDeDespesas()
      .subscribe((sugestoes) => (this.sugestoesDeCompras = sugestoes));
  }

  toggleScroll(): void {
    const isScrollingDown = this.scrollIcon === 'expand_more';
    window.scrollTo({
      top: isScrollingDown ? document.body.scrollHeight : 0,
      behavior: 'smooth',
    });
    this.scrollIcon = isScrollingDown ? 'expand_less' : 'expand_more';
  }
}
