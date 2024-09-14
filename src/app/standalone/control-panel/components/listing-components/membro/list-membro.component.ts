import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { Membro } from 'src/app/standalone/control-panel/interfaces/membro.interface';
import { MembroService } from 'src/app/standalone/control-panel/services/membro.service';

@Component({
  selector: 'modal-list-membro',
  templateUrl: './list-membro.component.html',
  styleUrls: ['./list-membro.component.scss'],
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
    MatTooltipModule,
    ConfirmDeleteComponent,
  ],
})
export class ListMembroComponent {
  membros: Membro[] = [];

  membroAtual: Membro;
  isEditing: boolean = false;

  constructor(
    private readonly membroService: MembroService,
    private readonly toastr: ToastrService,
    private readonly dialog: MatDialog
  ) {
    this.getAllMembros();
  }

  getAllMembros() {
    this.membroService
      .getAll()
      .subscribe((membros) => (this.membros = membros));
  }

  //#region Update

  openEdit(membro: Membro): void {
    if (!this.isEditing) {
      this.isEditing = true;
      membro.isEditing = !membro.isEditing;
      this.membroAtual = JSON.parse(JSON.stringify(membro));
    }
  }

  cancelEdit(membro: Membro) {
    Object.assign(membro, this.membroAtual);
    this.resetPropertys(membro);
  }

  updateMembro(code: string, membro: Membro): void {
    if (!this.membroAlterado(membro)) {
      this.membroService.update(code, membro).subscribe({
        next: (membroAtualizado) => {
          if (membroAtualizado) {
            this.toastr.success('Atualizado com sucesso!', 'Finalizado!');
          }
          this.getAllMembros();
        },
        error: () => this.getAllMembros(),
      });
    }
    this.resetPropertys(membro);
  }
  //#endregion

  //#region Delete
  confirmDelete(membroCode: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMembro(membroCode);
      }
    });
  }

  deleteMembro(membroCode: string): void {
    this.membroService.delete(membroCode).subscribe({
      next: (hasDeleted) => {
        if (hasDeleted) {
          this.toastr.success('Deletado com sucesso!', 'Finalizado!');
        }
        this.getAllMembros();
      },
    });
  }
  //#endregion

  membroAlterado(membro: Membro) {
    return (
      this.membroAtual.nome === membro.nome &&
      membro.telefone === this.membroAtual.telefone
    );
  }

  resetPropertys(membro: Membro) {
    membro.isEditing = false;
    this.isEditing = false;
    this.membroAtual = null;
  }

  isEditable(nome: string): boolean {
    return nome !== 'Jhon Lenon' && nome !== 'Peu' && nome !== 'Laila';
  }
}
