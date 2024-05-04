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
import { HomeService } from 'src/app/core/services/home/home-service';
import { ConfirmDeleteModal } from '../../utilities/delete/confirm-delete.modal';

@Component({
  selector: 'modal-view-GrupoDespesa',
  templateUrl: './view-grupo-despesa.modal.html',
  styleUrls: ['./view-grupo-despesa.modal.scss'],
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
    ConfirmDeleteModal,
  ],
})
export class ViewGrupoDespesaModal {
  grupoDespesas: GrupoDespesa[];

  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.getAllGrupoDespesas();
  }

  getAllGrupoDespesas() {
    this.homeService
      .getAll()
      .subscribe((grupoDespesa) => (this.grupoDespesas = grupoDespesa));
  }

  //#region Update
  openEdit(grupoDespesa: GrupoDespesa): void {
    grupoDespesa.isEditing = !grupoDespesa.isEditing;
  }

  updateGrupoDespesa(id: number, grupoDespesa: GrupoDespesa): void {
    this.homeService.update(id, grupoDespesa).subscribe({
      next: () => {
        this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
        this.getAllGrupoDespesas();
      },
      error: () => this.getAllGrupoDespesas(),
    });

    grupoDespesa.isEditing = false;
  }
  //#endregion

  //#region Delete
  confirmDelete(idGrupoDespesa: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModal, {
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
    this.homeService.delete(grupoDespesaId).subscribe({
      next: () => {
        this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        this.getAllGrupoDespesas();
      },
    });
  }

  //#endregion
}
