import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { GrupoDespesa } from 'src/app/core/interfaces/grupo-despesa.interface';
import { GrupoDespesaService } from 'src/app/core/services/grupo-despesa.service';
import { ConfirmDeleteComponent } from '../../delete/confirm-delete.component';
import { GrupoDespesaNotification } from 'src/app/core/services/grupo-despesa-notification.service';

@Component({
  selector: 'modal-listGrupoDespesa',
  templateUrl: './list-grupo-despesa.component.html',
  styleUrls: ['./list-grupo-despesa.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    ConfirmDeleteComponent,
  ],
})
export class ListGrupoDespesaComponent {
  grupoDespesas: GrupoDespesa[] = [];
  nomeMes: string;

  grupoDespesaAtual: GrupoDespesa;
  isEditing: boolean = false;

  constructor(
    private readonly grupoDespesaService: GrupoDespesaService,
    private readonly grupoDespesaNotification: GrupoDespesaNotification,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog
  ) {
    this.getAllGrupoDespesas();
  }

  getAllGrupoDespesas() {
    this.grupoDespesaService.getAll().subscribe((grupoDespesas) => {
      this.grupoDespesas = grupoDespesas.map((despesa) => {
        return {
          ...despesa,
          nomeEditavel: this.extrairMesDoNome(despesa.nome),
        };
      });
    });
  }
  //#region Update

  openEdit(grupoDespesa: GrupoDespesa): void {
    if (!this.isEditing) {
      this.isEditing = true;
      grupoDespesa.isEditing = !grupoDespesa.isEditing;
      this.grupoDespesaAtual = JSON.parse(JSON.stringify(grupoDespesa));
    }
  }
  cancelEdit(grupoDespesa: GrupoDespesa) {
    Object.assign(grupoDespesa, this.grupoDespesaAtual);
    this.resetPropertys(grupoDespesa);
  }

  updateGrupoDespesa(id: number, grupoDespesa: GrupoDespesa): void {
    if (!this.grupoDespesaAlterado(grupoDespesa)) {
      grupoDespesa.nome = grupoDespesa.nomeEditavel;

      this.grupoDespesaService.update(id, grupoDespesa).subscribe({
        next: (grupoDespesaAtualizado) => {
          if (grupoDespesaAtualizado) {
            this.grupoDespesaNotification.recarregarListaGrupoDespesa();
            this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
          }
          this.getAllGrupoDespesas();
        },
        error: () => this.getAllGrupoDespesas(),
      });
    }
    this.resetPropertys(grupoDespesa);
  }
  //#endregion

  //#region Delete
  confirmDelete(idGrupoDespesa: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: {
        descricao:
          'Apagar o Grupo irá deletar todas as despesas relacionadas a ele, deseja continuar?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteGrupoDespesa(idGrupoDespesa);
      }
    });
  }

  deleteGrupoDespesa(grupoDespesaId: number): void {
    this.grupoDespesaService.delete(grupoDespesaId).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.grupoDespesaNotification.recarregarListaGrupoDespesa();
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getAllGrupoDespesas();
      },
    });
  }

  //#endregion

  extrairMesDoNome(nome: string): string {
    const regex = /Fatura de ([\wÀ-ú]+) \d{4}/i;
    const match = nome.match(regex);
    return match ? match[1] : nome;
  }

  grupoDespesaAlterado(grupoDespesa: GrupoDespesa): boolean {
    return this.grupoDespesaAtual.nomeEditavel === grupoDespesa.nomeEditavel;
  }

  resetPropertys(grupoDespesa: GrupoDespesa) {
    grupoDespesa.isEditing = false;
    this.isEditing = false;
    this.grupoDespesaAtual = null;
  }
}
