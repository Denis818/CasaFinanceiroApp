import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { GrupoFaturaSeletorResponse } from 'src/app/core/portal/interfaces/grupo-fatura-seletor-response.interface';
import { GrupoFaturaService } from 'src/app/core/portal/services/grupo-fatura.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-selector-faturas',
  templateUrl: './selector-faturas.component.html',
  styleUrls: ['./selector-faturas.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class SelectorFaturasComponent implements OnInit {
  @Input() grupoFaturasForm: FormGroup;

  @Output() getListGruposFaturasParaSeletor = new EventEmitter<
    GrupoFaturaSeletorResponse[]
  >();

  grupoFaturas: GrupoFaturaSeletorResponse[] = [];

  constructor(
    private readonly storageService: StorageService,
    private readonly grupoFaturaService: GrupoFaturaService
  ) {}

  ngOnInit(): void {
    this.getListGrupoFaturaParaSeletorAsync();
  }

  getListGrupoFaturaParaSeletorAsync() {
    const ano = this.storageService.getItem('ano');

    this.grupoFaturaService.getListGrupoFaturaParaSeletorAsync(ano).subscribe({
      next: (grupoFaturas) => {
        this.grupoFaturas = grupoFaturas;

        if (this.grupoFaturas.length > 0) {
          this.grupoFaturasForm.patchValue({
            grupoFaturaCode1: this.grupoFaturas[0].code,
            grupoFaturaCode2:
              this.grupoFaturas.length > 1
                ? this.grupoFaturas[1].code
                : this.grupoFaturas[0].code,
          });
        }

        this.getListGruposFaturasParaSeletor.emit(this.grupoFaturas);
      },
    });
  }
}
