import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MembroService } from 'src/app/standalone/control-panel/services/membro.service';

@Component({
  selector: 'app-mensagem-whatsapp',
  templateUrl: './mensagem-whatsapp.component.html',
  styleUrls: ['./mensagem-whatsapp.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
})
export class MensagemWhatsAppComponent {
  valoresForm: FormGroup;

  get valoresValidator(): any {
    return this.valoresForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly membroService: MembroService,
    private readonly dialogRef: MatDialogRef<MensagemWhatsAppComponent>,
    private readonly fb: FormBuilder
  ) {
    this.validation();
    this.resetForm();
  }

  enviarMensagem(): void {
    if (this.valoresForm.valid) {
      this.membroService
        .enviarMensagemWhatsApp(
          this.data.nome,
          this.valoresForm.value.pix,
          this.data.isHabitacional,
          this.valoresForm.value.titleMessage ?? ''
        )
        .subscribe((redirectToWhatsApp) => {
          window.open(redirectToWhatsApp, '_blank');
        });
    }
  }

  public validation(): void {
    this.valoresForm = this.fb.group({
      pix: ['', [Validators.required]],
      titleMessage: [''],
      isHabitacional: [false],
    });
  }

  resetForm(): void {
    this.valoresForm.reset({
      pix: '',
      titleMessage: '',
      isHabitacional: false,
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
