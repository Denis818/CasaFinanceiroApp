import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
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
export class GraphicComponent implements OnChanges {
  @Input() graphicConfig: GraphicConfiguration;

  @Input() width: number = 1000;
  @Input() height: number = 1000;
  @Input() graphicType: ChartType = 'bar';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['graphicConfig']) {
      const config: GraphicConfiguration =
        changes['graphicConfig'].currentValue;

      if (config == null) {
        this.graphicConfig = {
          chartData: { datasets: [], labels: [] },
          chartOptions: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          },
        };
      }
    }
  }
}
