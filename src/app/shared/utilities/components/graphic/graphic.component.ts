import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartType,
  registerables,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

export class CustomDataset {
  datasets: Dataset[] = [];
  labels: string[] = [];
}
export interface Dataset {
  data: any[];
  label: string;
  borderColor: string;
  backgroundColor?: string;
}

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  standalone: true,
  imports: [BaseChartDirective],
})
export class GraphicComponent implements OnInit, OnChanges {
  @Input() chartType: ChartType = 'line';
  @Input() datasets: CustomDataset = new CustomDataset();

  chartData: ChartData = {
    datasets: [],
    labels: [],
  };
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  ngOnInit(): void {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Assegurando que a atualização é feita apenas se houver mudanças relevantes
    if (changes['datasets'] && !changes['datasets'].firstChange) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    // Verificação de segurança para garantir que datasets e labels estejam definidos
    if (this.datasets && this.datasets.labels && this.datasets.datasets) {
      this.chartData.labels = this.datasets.labels;
      this.chartData.datasets = this.datasets.datasets.map((ds) => ({
        data: ds.data,
        borderColor: ds.borderColor,
        backgroundColor: ds.backgroundColor || ds.borderColor,
        label: ds.label,
        fill: false,
      }));
    }
  }
}
