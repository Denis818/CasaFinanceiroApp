import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { GrupoDespesaNotification } from 'src/app/core/utilities/grupo-despesa-notification';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { MediaPorFornecedor } from '../../../interfaces/media-por-fornecedor.interface';
import { ConferenciaComprasService } from '../../../services/conferencia-compras.service';

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

registerLocaleData(localePt);
@Component({
  selector: 'media-por-fornecedor',
  templateUrl: './media-por-fornecedor.component.html',
  styleUrls: [
    './media-por-fornecedor.component.scss',
    '../painel-economia.component.scss',
  ],
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
export class DespesasPorFornecedorComponent implements OnDestroy {
  private reloadPageSubscriber: Subscription;

  mediasPorFornecedor: MediaPorFornecedor[] = [];

  tamanhosDePagina: number[] = [5, 10, 50];

  constructor(
    private readonly comprasService: ConferenciaComprasService,
    private readonly grupoDespesaNotification: GrupoDespesaNotification
  ) {
    this.reloadDespesas();
  }

  ngOnDestroy() {
    if (this.reloadPageSubscriber) {
      this.reloadPageSubscriber.unsubscribe();
    }
  }

  //#region Get
  mediaDespesasPorFornecedor() {
    this.comprasService
      .mediaDespesasPorFornecedor(1, this.tamanhosDePagina[0])
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

  reloadDespesas() {
    this.reloadPageSubscriber =
      this.grupoDespesaNotification.recarregarPaginaComNovoGrupoId.subscribe({
        next: (isReload) => {
          if (isReload) {
            this.mediaDespesasPorFornecedor();
          }
        },
      });
  }
  //#endregion

  //#region Paginação
  mudarPagina(event: PageEvent, sugestao: MediaPorFornecedor): void {
    sugestao.page.paginaAtual = event.pageIndex + 1;
    sugestao.page.itensPorPagina = event.pageSize;
    this.atualizarItensSugestao(sugestao);
  }

  atualizarItensSugestao(sugestao: MediaPorFornecedor) {
    this.comprasService
      .mediaDespesasPorFornecedor(
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
  //#endregion

  //#region Metodos de suporte
  toggleDetail(index: number) {
    this.mediasPorFornecedor[index].expanded =
      !this.mediasPorFornecedor[index].expanded;
  }

  removerPrefixoFatura(nome: string): string {
    const prefixo = 'Fatura de ';
    if (nome.startsWith(prefixo)) {
      return nome.slice(prefixo.length);
    }
    return nome;
  }
  //#endregion
}
