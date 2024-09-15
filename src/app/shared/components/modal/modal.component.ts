import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
})
export class ModalComponent {
  public dialogRef?: MatDialogRef<any> = inject(MatDialogRef<any>);

  @Input()
  textConfirmButton?: string;

  @Input()
  textCancelButton?: string;

  @Input()
  textTitle: string = '';

  @Input()
  formClass: string = '';

  @Output()
  confirmClick: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  cancelClick: EventEmitter<any> = new EventEmitter<any>();

  onNoClick(): void {
    this.cancelClick.emit();
    this.dialogRef?.close();
  }

  onConfirmClick(): void {
    this.confirmClick.emit(this.dialogRef);
  }
}
