import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PainelControleService } from '../../services/painel-controle.service';

@Component({
  selector: 'app-painel-controle-page',
  templateUrl: './painel-controle.page.html',
  styleUrls: ['./painel-controle.page.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PainelControlePage {
  constructor(private painelService: PainelControleService) {}

  private insertDespesa(despesa: any): void {
    this.painelService.insert(despesa, 'Despesa');
  }
}
