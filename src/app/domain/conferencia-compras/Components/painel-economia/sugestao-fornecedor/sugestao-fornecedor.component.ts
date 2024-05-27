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
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { GrupoDespesaNotification } from 'src/app/core/services/grupo-despesa-notification.service';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { SugestaoDeFornecedorResponse } from '../../../interfaces/sugestao-fornecedor-response';
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
  selector: 'sugestao-fornecedor',
  templateUrl: './sugestao-fornecedor.component.html',
  styleUrls: [
    './sugestao-fornecedor.component.scss',
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
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatPaginatorModule,
  ],
})
export class SugestaoFornecedorComponent implements OnDestroy {
  private reloadPageSubscriber: Subscription;

  sugestoesDeFornecedores: SugestaoDeFornecedorResponse[] = [];
  sugestoesDeFornecedoresFiltradas: SugestaoDeFornecedorResponse[] = [];

  tamanhosDePagina: number[] = [5, 10, 50];
  filtroSugestao: string = '';

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

  mediaDespesasPorFornecedor() {
    this.comprasService
      .mediaDespesasPorFornecedor(1, this.tamanhosDePagina[0])
      .subscribe((sugestoesDespesas) => {
        this.sugestoesDeFornecedores = sugestoesDespesas.map((sugestao) => ({
          ...sugestao,
          page: {
            totalItens: sugestao.listaItens.totalItens,
            paginaAtual: 1,
            itensPorPagina: this.tamanhosDePagina[0],
          },
        }));
        this.filtrarSugestoes();
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

  mudarPagina(event: PageEvent, sugestao: SugestaoDeFornecedorResponse): void {
    sugestao.page.paginaAtual = event.pageIndex + 1;
    sugestao.page.itensPorPagina = event.pageSize;
    this.atualizarItensSugestao(sugestao);
  }

  atualizarItensSugestao(sugestao: SugestaoDeFornecedorResponse) {
    this.comprasService
      .mediaDespesasPorFornecedor(
        sugestao.page.paginaAtual,
        sugestao.page.itensPorPagina
      )
      .subscribe((sugestoesDespesas) => {
        const index = this.sugestoesDeFornecedores.findIndex(
          (s) => s.sugestao === sugestao.sugestao
        );
        if (index !== -1) {
          this.sugestoesDeFornecedores[index].listaItens =
            sugestoesDespesas[index].listaItens;
          this.sugestoesDeFornecedores[index].page = sugestao.page;
        }
        this.filtrarSugestoes();
      });
  }

  filtrarSugestoes() {
    if (this.filtroSugestao) {
      this.sugestoesDeFornecedoresFiltradas =
        this.sugestoesDeFornecedores.filter((sugestao) =>
          sugestao.sugestao
            .toLowerCase()
            .includes(this.filtroSugestao.toLowerCase())
        );
    } else {
      this.sugestoesDeFornecedoresFiltradas = [...this.sugestoesDeFornecedores];
    }
  }

  toggleDetail(index: number) {
    this.sugestoesDeFornecedoresFiltradas[index].expanded =
      !this.sugestoesDeFornecedoresFiltradas[index].expanded;
  }

  removerPrefixoFatura(nome: string): string {
    const prefixo = 'Fatura de ';
    if (nome.startsWith(prefixo)) {
      return nome.slice(prefixo.length);
    }
    return nome;
  }
}
