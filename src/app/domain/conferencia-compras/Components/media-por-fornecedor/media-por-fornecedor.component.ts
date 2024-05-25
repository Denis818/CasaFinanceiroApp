import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { MediaPorFornecedor } from '../../interfaces/media-por-fornecedor.interface';
import { ConferenciaComprasService } from '../../services/conferencia-compras.service';

registerLocaleData(localePt);

export const slideDownAnimation = trigger('slideDown', [
  state(
    'collapsed',
    style({
      height: '0px',
      overflow: 'hidden',
      opacity: 0,
    })
  ),
  state(
    'expanded',
    style({
      height: '*',
      opacity: 1,
    })
  ),
  transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
]);

@Component({
  selector: 'media-por-fornecedor',
  templateUrl: './media-por-fornecedor.component.html',
  styleUrls: ['./media-por-fornecedor.component.scss'],
  animations: [slideDownAnimation],
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginator },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
})
export class DespesasPorFornecedorComponent {
  mediasPorFornecedor: MediaPorFornecedor[] = [];
  scrollIcon = 'expand_more';
  tamanhosDePagina: number[] = [5, 10, 50, 100];

  constructor(private comprasService: ConferenciaComprasService) {
    this.getSugestoesDeOtimizacaoDeDespesas();
  }
  getSugestoesDeOtimizacaoDeDespesas() {
    this.comprasService
      .getSugestoesDeOtimizacaoDeDespesas(1, this.tamanhosDePagina[0])
      .subscribe((sugestoesDespesas) => {
        this.mediasPorFornecedor = sugestoesDespesas.map((sugestao) => ({
          ...sugestao,
          page: {
            totalItens: sugestao.itensDesteFornecedor.totalItens,
            paginaAtual: 1,
            itensPorPagina: this.tamanhosDePagina[0],
          },
        }));
      });
  }

  mudarPagina(event: PageEvent, sugestao: MediaPorFornecedor): void {
    sugestao.page.paginaAtual = event.pageIndex + 1;
    sugestao.page.itensPorPagina = event.pageSize;
    this.atualizarItensSugestao(sugestao);
  }

  atualizarItensSugestao(sugestao: MediaPorFornecedor) {
    this.comprasService
      .getSugestoesDeOtimizacaoDeDespesas(
        sugestao.page.paginaAtual,
        sugestao.page.itensPorPagina
      )
      .subscribe((sugestoesDespesas) => {
        const index = this.mediasPorFornecedor.findIndex(
          (s) => s.mediaDeFornecedor === sugestao.mediaDeFornecedor
        );
        if (index !== -1) {
          this.mediasPorFornecedor[index].itensDesteFornecedor =
            sugestoesDespesas[index].itensDesteFornecedor;
          this.mediasPorFornecedor[index].page = sugestao.page;
        }
      });
  }

  teste: boolean;

  toggleDetail(index: number) {
    this.mediasPorFornecedor[index].expanded =
      !this.mediasPorFornecedor[index].expanded;

    this.teste = this.mediasPorFornecedor[index].expanded;
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
