import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
import { EditMembroComponent } from '../../edition-components/membro/edit-membro.component';

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
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<ListMembroComponent>
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
    const dialogRef = this.dialog.open(EditMembroComponent, {
      width: '600px',
      data: { ...membro },
    });

    dialogRef.afterClosed().subscribe((membro: Membro) => {
      if (membro) {
        this.updateMembro(membro.code, membro);
      }
    });
  }

  updateMembro(code: string, membro: Membro): void {
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

  isEditable(nome: string): boolean {
    return nome !== 'Jhon Lenon' && nome !== 'Peu' && nome !== 'Laila';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
