import { Injectable } from '@angular/core';
import { EnumFiltroDespesa } from '../../enums/enum-filtro-despesa';

@Injectable({
  providedIn: 'root',
})
export class ListFiltroDespesa {
  listTipoFiltrAuditoriaCompras = [
    { value: EnumFiltroDespesa.Item, viewValue: 'Item' },
    { value: EnumFiltroDespesa.Categoria, viewValue: 'Categoria' },
    { value: EnumFiltroDespesa.Fornecedor, viewValue: 'Fornecedor' },
    { value: EnumFiltroDespesa.GrupoFatura, viewValue: 'Grupo de Fatura' },
    { value: EnumFiltroDespesa.Preco, viewValue: 'Preço' },
  ];

  listTipoFiltroPainelControle = [
    { value: EnumFiltroDespesa.Item, viewValue: 'Item' },
    { value: EnumFiltroDespesa.Categoria, viewValue: 'Categoria' },
    { value: EnumFiltroDespesa.Fornecedor, viewValue: 'Fornecedor' },
    { value: EnumFiltroDespesa.Preco, viewValue: 'Preço' },
  ];
}
