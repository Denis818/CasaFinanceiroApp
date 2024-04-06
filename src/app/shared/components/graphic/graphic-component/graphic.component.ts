import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraphicConfiguration } from '../interfaces/graphic-configuration.interface';

Chart.register(...registerables);

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
})
export class GraphicComponent {
  @Input() graphicConfig: GraphicConfiguration = {
    chartData: { datasets: [], labels: [] },
    graphicStyle: {
      graphicType: 'line',
      width: 700,
      height: 400,
    },
    chartOptions: {
      responsive: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  };
}
