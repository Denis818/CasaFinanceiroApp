import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Membro } from '../../../interfaces/membro.interface';
import { PainelControleService } from '../../../services/painel-controle.service';
import { ConfirmDeleteComponent } from '../../delete/confirm-delete.component';

@Component({
  selector: 'modal-view-membro',
  templateUrl: './modal-view-membro.component.html',
  styleUrls: ['./modal-view-membro.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    ConfirmDeleteComponent,
  ],
})
export class ModalViewMembro {
  membros: Membro[];
  constructor(
    private painelService: PainelControleService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.getAllMembros();
  }

  getAllMembros() {
    this.painelService
      .getAll<Membro>('Membro')
      .subscribe((membros) => (this.membros = membros));
  }

  //#region Update
  openEdit(membro: Membro): void {
    membro.isEditing = !membro.isEditing;
  }

  updateMembro(id: number, membro: Membro): void {
    this.painelService.update(id, membro, 'Membro').subscribe({
      next: () => {
        this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
      },
    });
    membro.isEditing = false;
    this.getAllMembros();
  }
  //#endregion

  //#region Delete
  confirmDelete(idMembro: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMembro(idMembro);
      }
    });
  }

  deleteMembro(membroId: number): void {
    this.painelService.delete(membroId, 'Membro').subscribe({
      next: () => {
        this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        this.getAllMembros();
      },
    });
  }

  //#endregion
}
