import { Injectable } from '@angular/core';
import { EnumFiltroDespesa } from '../../enums/enumFiltroDespesa';

@Injectable({
  providedIn: 'root',
})
export class ListFiltroDespesa {
  listTipoFiltro = [
    { value: EnumFiltroDespesa.Item, viewValue: 'Item' },
    { value: EnumFiltroDespesa.Categoria, viewValue: 'Categoria' },
    { value: EnumFiltroDespesa.Fornecedor, viewValue: 'Fornecedor' },
  ];
}
