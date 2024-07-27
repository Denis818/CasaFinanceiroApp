import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListDespesasComponent } from 'src/app/modules/control-panel/components/list-despesas/list-despesas.component';
import { CreateCategoriaComponent } from 'src/app/modules/control-panel/components/modais/create/categoria/create-categoria.component';
import { CreateDespesaComponent } from 'src/app/modules/control-panel/components/modais/create/despesa/create-despesa.component';
import { CreategrupoFaturaComponent } from 'src/app/modules/control-panel/components/modais/create/grupo-fatura/create-grupo-fatura.component';
import { CreateMembroComponent } from 'src/app/modules/control-panel/components/modais/create/membro/create-membro.component';
import { ListCategoriaComponent } from 'src/app/modules/control-panel/components/modais/list/list-categoria/list-categoria.component';
import { ListgrupoFaturaComponent } from 'src/app/modules/control-panel/components/modais/list/list-grupo-fatura/list-grupo-fatura.component';
import { ListMembroComponent } from 'src/app/modules/control-panel/components/modais/list/list-membro/list-membro.component';
import { CustomPaginator } from 'src/app/shared/utilities/paginator/custom-paginator';

@Component({
  selector: 'painel-controle-page',
  templateUrl: './painel-controle.page.html',
  styleUrls: ['./painel-controle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ListDespesasComponent,
    CreateDespesaComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginator }],
})
export class PainelControlePage {
  constructor(private readonly dialog: MatDialog) {}

  @ViewChild(ListDespesasComponent) listDespesaModal: ListDespesasComponent;

  //#region  Lists
  openListCategoriaModal() {
    const dialogRef = this.dialog.open(ListCategoriaComponent, {
      width: '400px',
    });

    dialogRef.componentInstance.notificarCategoriaAtualizada.subscribe(() => {
      this.listDespesaModal.getListDespesasPorGrupo();
    });

    dialogRef.afterClosed();
  }

  openListMembroModal() {
    const dialogRef = this.dialog.open(ListMembroComponent, {
      width: '800px',
    });
    dialogRef.afterClosed();
  }

  openListgrupoFaturasModal() {
    const dialogRef = this.dialog.open(ListgrupoFaturaComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed();
  }
  //#endregion

  //#region Create
  openCreateDespesaModal(): void {
    const dialogRef = this.dialog.open(CreateDespesaComponent, {
      width: '400px',
    });

    dialogRef.componentInstance.notificarDespesaInserida.subscribe(() => {
      this.listDespesaModal.getListDespesasPorGrupo();
    });
  }

  openCreategrupoFaturaModal(): void {
    this.dialog.open(CreategrupoFaturaComponent, {
      width: '400px',
    });
  }

  openCreateMembroModal(): void {
    this.dialog.open(CreateMembroComponent, {
      width: '400px',
    });
  }

  openCreateCategoriaModal(): void {
    this.dialog.open(CreateCategoriaComponent, {
      width: '400px',
    });
  }
  //#endregion
}
