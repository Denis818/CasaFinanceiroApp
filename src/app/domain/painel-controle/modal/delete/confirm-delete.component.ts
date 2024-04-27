import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDividerModule, MatIconModule],
})
export class ConfirmDeleteComponent {
}
