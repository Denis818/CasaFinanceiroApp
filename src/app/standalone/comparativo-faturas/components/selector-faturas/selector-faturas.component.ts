import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { GrupoFaturaSeletorResponse } from 'src/app/core/portal/interfaces/grupo-fatura-seletor-response.interface';

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
  @Input() grupoFaturas: GrupoFaturaSeletorResponse[];

  constructor() {}

  ngOnInit() {}
}
