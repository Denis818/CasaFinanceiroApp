import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { Compra } from '../interfaces/compra.interface';
import { Recebimento } from '../interfaces/recebimento.interface';
import { CompraService } from '../services/compras.service';
import { RecebimentoService } from '../services/recebimento.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    CurrencyMaskModule,
    MatButtonModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class CompraPage implements OnInit {
  listComprasDivdidasPorDois: Compra[] = [];
  listCompras: Compra[] = [];
  listRecebimentos: Recebimento[] = [];

  valorTotalSomadoListCompras = 0;
  valorTotalSomadoListComprasDivdidasPorDois = 0;
  valorTotalDividoListComprasDivdidasPorDois = 0;
  valorTotalSomadoListRecebimentos = 0;

  constructor(
    private readonly compraService: CompraService,
    private readonly recebimentoService: RecebimentoService
  ) {}

  ngOnInit() {
    this.getAllCompras();
    this.getAllComprasDivididasPorDois();
    this.getAllRecebimentos();
  }

  //#region GETs
  getAllCompras() {
    this.compraService.getAll().subscribe({
      next: (compras) => {
        this.listCompras = compras;
        this.valorTotalSomadoListCompras = compras.reduce(
          (acc, compra) => acc + compra.valorTotal,
          0
        );
      },
    });
  }

  getAllComprasDivididasPorDois() {
    this.compraService.getAllComprasDivididasPorDois().subscribe({
      next: (comprasDivididasPorDois) => {
        this.listComprasDivdidasPorDois = comprasDivididasPorDois;
        this.valorTotalSomadoListComprasDivdidasPorDois =
          comprasDivididasPorDois.reduce(
            (acc, compra) => acc + compra.valorTotal,
            0
          );

        this.valorTotalDividoListComprasDivdidasPorDois =
          this.valorTotalSomadoListComprasDivdidasPorDois / 2;
      },
    });
  }

  getAllRecebimentos() {
    this.recebimentoService.getAll().subscribe({
      next: (recebimentos) => {
        this.listRecebimentos = recebimentos;
        this.valorTotalSomadoListRecebimentos = recebimentos.reduce(
          (acc, compra) => acc + compra.valor,
          0
        );
      },
    });
  }
  //#endregion
}
