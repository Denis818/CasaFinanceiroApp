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
import { CreateCobrancaComponent } from '../components/create-cobranca/create-cobranca.component';
import { CreatePagamentoComponent } from '../components/create-pagamento/create-pagamento.component';
import { Cobranca } from '../interfaces/cobranca.interface';
import { Pagamento } from '../interfaces/pagamento.interface';
import { CobrancaService } from '../services/cobranca.service';
import { PagamentoService } from '../services/pagamento.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-cobranca',
  templateUrl: './cobranca.page.html',
  styleUrls: ['./cobranca.page.scss'],
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
export class CobrancaPage implements OnInit {
  listCobrancaDivdidasPorDois: Cobranca[] = [];
  listCobranca: Cobranca[] = [];
  listPagamento: Pagamento[] = [];

  valorTotalSomadoListCobranca = 0;
  valorTotalSomadoListCobrancaDivdidasPorDois = 0;
  valorTotalDividoListCobrancaDivdidasPorDois = 0;
  valorTotalSomadoListPagamento = 0;

  constructor(
    private readonly cobrancaService: CobrancaService,
    private readonly Pagamentoervice: PagamentoService,
    public readonly titleService: Title,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllCobrancaSomente();
    this.getAllCobrancaDivididasPorDois();
    this.getAllPagamento();
  }

  //#region GETs
  getAllCobrancaSomente() {
    this.cobrancaService.getAll().subscribe({
      next: (Cobranca) => {
        this.listCobranca = Cobranca;
        this.valorTotalSomadoListCobranca = Cobranca.reduce(
          (acc, compra) => acc + compra.valorTotal,
          0
        );
      },
    });
  }

  getAllCobrancaDivididasPorDois() {
    this.cobrancaService.getAllComprasDivididasPorDois().subscribe({
      next: (CobrancaDivididasPorDois) => {
        this.listCobrancaDivdidasPorDois = CobrancaDivididasPorDois;
        this.valorTotalSomadoListCobrancaDivdidasPorDois =
          CobrancaDivididasPorDois.reduce(
            (acc, compra) => acc + compra.valorTotal,
            0
          );

        this.valorTotalDividoListCobrancaDivdidasPorDois =
          this.valorTotalSomadoListCobrancaDivdidasPorDois / 2;
      },
    });
  }

  getAllPagamento() {
    this.Pagamentoervice.getAll().subscribe({
      next: (Pagamento) => {
        this.listPagamento = Pagamento;
        this.valorTotalSomadoListPagamento = Pagamento.reduce(
          (acc, compra) => acc + compra.valor,
          0
        );
      },
    });
  }
  //#endregion

  //#region ADD
  addCobrancaDivididas() {
    const dialogRef = this.dialog.open(CreateCobrancaComponent, {
      width: '400px',
      data: { divididoPorDois: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllCobrancaDivididasPorDois();
      }
    });
  }

  addCobrancaSomente() {
    const dialogRef = this.dialog.open(CreateCobrancaComponent, {
      width: '400px',
      data: { divididoPorDois: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllCobrancaSomente();
      }
    });
  }

  addValorRecebido() {
    const dialogRef = this.dialog.open(CreatePagamentoComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllPagamento();
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
    this.cobrancaService.delete(code).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getAllCobrancaSomente();
        this.getAllCobrancaDivididasPorDois();
      },
    });
  }

  deleteRecebimento(code: string): void {
    this.Pagamentoervice.delete(code).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getAllPagamento();
      },
    });
  }

  //#endregion
}
