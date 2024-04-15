import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { FormatDateModule } from 'src/app/shared/pipes/date/format-date-module/format-date.module';
import { Categoria } from '../../interfaces/categoria.interface';
import { Despesa } from '../../interfaces/despesa.interface';
import { Membro } from '../../interfaces/membro.interface';
import { PainelControleService } from '../../services/painel-controle.service';

@Component({
  selector: 'app-painel-controle-page',
  templateUrl: './painel-controle.page.html',
  styleUrls: ['./painel-controle.page.scss'],
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, FormatDateModule],
  providers: [{ provide: MatPaginatorIntl }],
})
export class PainelControlePage implements OnInit {
  [x: string]: any;
  despesas: Despesa[];
  membros: Membro[];
  categorias: Categoria[];

  totalItens = 0;
  paginaAtual = 1;
  itensPorPagina = 10;

  constructor(private painelService: PainelControleService) {}

  ngOnInit(): void {
    this.getAllCategorias();
    this.getAllMembros();
    this.getAllDespesas();
  }

  getAllCategorias() {
    this.painelService
      .getAll<Categoria>('Categoria')
      .subscribe((categorias) => (this.categorias = categorias));
  }
  
  getAllMembros() {
    this.painelService
      .getAll<Membro>('Membro')
      .subscribe((membros) => (this.membros = membros));
  }

  getAllDespesas() {
    this.painelService
      .getAllDespesas(this.paginaAtual, this.itensPorPagina)
      .subscribe((data) => {
        this.despesas = data.itens;
        this.totalItens = data.totalItens;
        this.paginaAtual = data.paginaAtual;

        console.log(this.paginaAtual, this.itensPorPagina);
      });
  }

  mudarPagina(event: PageEvent): void {
    this.paginaAtual = event.pageIndex + 1;
    this.itensPorPagina = event.pageSize;
    this.getAllDespesas();
  }
}
