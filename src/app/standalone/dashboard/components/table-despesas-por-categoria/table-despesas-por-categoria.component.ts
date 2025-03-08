import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Categoria } from 'src/app/standalone/control-panel/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/standalone/control-panel/services/categoria.service';
registerLocaleData(localePt);

@Component({
  selector: 'app-table-despesas-por-categoria',
  templateUrl: './table-despesas-por-categoria.component.html',
  styleUrls: ['./table-despesas-por-categoria.component.scss'],
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    FormsModule,
  ],
})
export class TableDespesasPorCategoriaComponent {
  listCategorias: Categoria[] = [];

  constructor(private readonly categoriaService: CategoriaService) {}

  getTotalPorCategoria(categorias: Categoria[]) {
    this.listCategorias = categorias;
  }
}
