import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DespesaPorMembroResponse } from '../../interfaces/financy/despesa-por-membro-response.interface';
import { FinancyService } from '../../services/financy/financy.service';

@Component({
  selector: 'app-financy',
  templateUrl: './financy.page.html',
  styleUrls: ['./financy.page.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FinancyPage implements OnInit {
  despesasPorMembros: DespesaPorMembroResponse[] = [];

  constructor(private readonly financyService: FinancyService) {}

  ngOnInit() {
    this.getTotalParaCadaMembro();
  }

  getTotalParaCadaMembro() {
    this.financyService.getTotalParaCadaMembro().subscribe((dados) => {
      this.despesasPorMembros = dados.despesasPorMembros;
    });
  }
}
