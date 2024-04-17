import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FormatDateModule } from 'src/app/shared/pipes/date/format-date-module/format-date.module';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';
import { Pagination } from 'src/app/shared/utilities/paginator/pagination';
import { Despesa } from '../../interfaces/despesa.interface';
import { Membro } from '../../interfaces/membro.interface';
import { PainelControleService } from '../../services/painel-controle.service';
import { Categoria } from './../../interfaces/categoria.interface';

@Component({
  selector: 'app-painel-controle-page',
  templateUrl: './painel-controle.page.html',
  styleUrls: ['./painel-controle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormatDateModule,
    FormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class PainelControlePage implements OnInit {
  despesas: Despesa[];
  membros: Membro[];
  categorias: Categoria[];
  categoriaDescricao: string = '';

  tamanhosDePagina: number[] = [5, 10, 50, 100];
  page: Pagination = {
    totalItens: 0,
    paginaAtual: 1,
    itensPorPagina: this.tamanhosDePagina[1],
  };

  constructor(
    private painelService: PainelControleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategorias();
    this.getAllMembros();
    this.getAllDespesas();
  }

  toggleEdit(categoria: Categoria): void {
    categoria.isEditing = !categoria.isEditing;
    this.categoriaDescricao = categoria.descricao;
  }

  updateCategoria(id: number, categoria: Categoria): void {
    if (categoria.descricao != this.categoriaDescricao) {
      console.log('chamou');
      this.painelService.update(id, categoria, 'Categoria').subscribe({
        next: () => {
          this.toastr.success(
            'Alterações realizadas com sucesso!',
            'Finalizado!'
          );
          categoria.isEditing = false;
          this.getAllCategorias();
        },
      });
    }
    categoria.isEditing = false;
    this.getAllCategorias();
  }

  //#region "Gets"
  getAllDespesas() {
    this.painelService
      .getAllDespesas(this.page.paginaAtual, this.page.itensPorPagina)
      .subscribe((data) => {
        this.despesas = data.itens;
        this.page.totalItens = data.totalItens;
        this.page.paginaAtual = data.paginaAtual;
      });
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
  //#endregion

  mudarPagina(event: PageEvent): void {
    this.page.paginaAtual = event.pageIndex + 1;
    this.page.itensPorPagina = event.pageSize;
    this.getAllDespesas();
  }
}
