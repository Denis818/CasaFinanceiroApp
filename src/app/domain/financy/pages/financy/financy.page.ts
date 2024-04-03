import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DespesaPorMembroResponse } from '../../interfaces/financy/despesa-por-membro-response.interface';
import { Despesa } from '../../interfaces/financy/despesa.interface';
import { FinancyService } from '../../services/financy/financy.service';

@Component({
  selector: 'app-financy',
  templateUrl: './financy.page.html',
  styleUrls: ['./financy.page.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FinancyPage implements OnInit {
  listComprasPorMes: Despesa[] = [];

  constructor(private readonly financyService: FinancyService) {}

  ngOnInit() {
    this.getTotalParaCadaMembro();
  }

  getTotaisComprasPorMes() {
    this.financyService.getTotaisComprasPorMes(1, 2).subscribe((dados: any) => {
      this.listComprasPorMes = dados.itens;
    });
  }

  despesasPorMembros: DespesaPorMembroResponse[] = [];

  getTotalParaCadaMembro() {
    this.financyService.getTotalParaCadaMembro().subscribe((dados) => {
      this.despesasPorMembros = dados.despesasPorMembros;
    });
  }
}

export interface paginationDto {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
