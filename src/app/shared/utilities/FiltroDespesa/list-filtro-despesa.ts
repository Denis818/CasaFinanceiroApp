import { Injectable } from '@angular/core';
import { EnumFiltroDespesa } from '../../enums/enum-filtro-despesa';

@Injectable({
  providedIn: 'root',
})
export class ListFiltroDespesa {
  private readonly baseListFilter = [
    { value: EnumFiltroDespesa.Item, viewValue: 'Item' },
    { value: EnumFiltroDespesa.Categoria, viewValue: 'Categoria' },
    { value: EnumFiltroDespesa.Fornecedor, viewValue: 'Fornecedor' },
    { value: EnumFiltroDespesa.Preco, viewValue: 'Preço Igual' },
    {
      value: EnumFiltroDespesa.PrecoMenorOuIgual,
      viewValue: 'Preço Menor ou Igual',
    },
    {
      value: EnumFiltroDespesa.PrecoMaiorOuIgual,
      viewValue: 'Preço Maior ou Igual',
    },
  ];

  listTipoFiltroPainelControle = [...this.baseListFilter];

  listTipoFiltrAuditoriaCompras = [
    { value: EnumFiltroDespesa.GrupoFatura, viewValue: 'Grupo de Fatura' },
    ...this.baseListFilter,
  ];
}
