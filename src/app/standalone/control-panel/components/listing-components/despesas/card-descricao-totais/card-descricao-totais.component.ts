import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { EnumTipoMetrica } from 'src/app/standalone/control-panel/enums/enum-tipo-metrica';
import { ParametroAlertaGastos } from 'src/app/standalone/control-panel/interfaces/parametro-alerta-gastos.interface';
import { DespesaService } from 'src/app/standalone/control-panel/services/despesa.service';
import { MetricasNotification } from './metricas-notification.service';

@Component({
  selector: 'app-card-descricao-totais',
  templateUrl: './card-descricao-totais.component.html',
  styleUrls: ['./card-descricao-totais.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class CardDescricaoTotaisComponent implements OnInit {
  metricas: ParametroAlertaGastos[] = [];
  enumTipoMetricas: EnumTipoMetrica[] = [
    EnumTipoMetrica.casa,
    EnumTipoMetrica.moradia,
    EnumTipoMetrica.geral,
  ];
  constructor(
    private readonly toastr: ToastrService,
    private metricasNotification: MetricasNotification,
    private despesaService: DespesaService,
    public dialogRef: MatDialogRef<CardDescricaoTotaisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getParametrosDeAlertasDeGastos();
  }

  getParametrosDeAlertasDeGastos() {
    this.despesaService
      .getParametrosDeAlertasDeGastos()
      .subscribe((metricas) => {
        this.metricas = metricas;
      });
  }

  getMetrica(tipoMetrica: EnumTipoMetrica): ParametroAlertaGastos {
    return this.metricas.find((m) => m.tipoMetrica === tipoMetrica);
  }

  salvarMetricas(): void {
    console.log(this.metricas);
    this.despesaService.updateParametroAlertaGastos(this.metricas).subscribe({
      next: (success) => {
        if (success) {
          this.toastr.success('Métricas atualizadas!', 'Finalizado!');
          this.metricasNotification.notificarCardTotaisMetricaMudou();
        }
      },
    });
    this.dialogRef.close();
  }
}
