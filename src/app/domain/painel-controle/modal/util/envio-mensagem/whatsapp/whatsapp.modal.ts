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
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PainelControleService } from 'src/app/domain/painel-controle/services/painel-controle.service';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.modal.html',
  styleUrls: ['./whatsapp.modal.scss'],
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
    MatDialogModule,
  ],
})
export class WhatsappModal {
  valoresForm: FormGroup;

  get valoresValidator(): any {
    return this.valoresForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private painelService: PainelControleService,
    public dialogRef: MatDialogRef<WhatsappModal>,
    private fb: FormBuilder
  ) {
    this.validation();
    this.resetForm();
  }

  enviarMensagem(): void {
    if (this.valoresForm.valid) {
      this.painelService
        .enviarMensagemWhatsApp(
          this.data.nome,
          this.valoresForm.value.pix,
          this.valoresForm.value.isHabitacional,
          this.valoresForm.value.titleMessage ?? ''
        )
        .subscribe((url) => {
          window.open(url, '_blank');
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
