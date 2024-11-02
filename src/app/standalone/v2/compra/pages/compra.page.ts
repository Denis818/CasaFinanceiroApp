import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { CreateCompraComponent } from '../components/create-compra/create-compra.component';
import { CreateRecebimentoComponent } from '../components/create-recebimento/create-recebimento.component';
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
    private readonly recebimentoService: RecebimentoService,
    public readonly titleService: Title,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllComprasSomente();
    this.getAllComprasDivididasPorDois();
    this.getAllRecebimentos();
  }

  //#region GETs
  getAllComprasSomente() {
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

  //#region ADD
  addComprasDivididas() {
    const dialogRef = this.dialog.open(CreateCompraComponent, {
      width: '400px',
      data: { divididoPorDois: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllComprasDivididasPorDois();
      }
    });
  }

  addComprasSomente() {
    const dialogRef = this.dialog.open(CreateCompraComponent, {
      width: '400px',
      data: { divididoPorDois: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllComprasSomente();
      }
    });
  }

  addValorRecebido() {
    const dialogRef = this.dialog.open(CreateRecebimentoComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllRecebimentos();
      }
    });
  }
  //#endregion

  //#region Delete
  confirmDelete(code: string, pagmaento: boolean = false): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '380px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (pagmaento) {
          this.deleteRecebimento(code);
        } else {
          this.deleteCompra(code);
        }
      }
    });
  }

  deleteCompra(code: string): void {
    this.compraService.delete(code).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getAllComprasSomente();
        this.getAllComprasDivididasPorDois();
      },
    });
  }

  deleteRecebimento(code: string): void {
    this.recebimentoService.delete(code).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getAllRecebimentos();
      },
    });
  }

  //#endregion
}
