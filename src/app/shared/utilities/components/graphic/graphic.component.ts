import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartType,
  registerables,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

export interface Dataset {
  data: any[];
  label: string;
  borderColor: string;
  backgroundColor?: string;
}

export class CustomDataset {
  datasets: Dataset[] = [];
  labels: string[] = [];
}

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  standalone: true,
  imports: [BaseChartDirective],
})
export class GraphicComponent implements OnChanges {
  @Input() chartType: ChartType = 'line';
  @Input() datasets: CustomDataset = new CustomDataset();

  teste: string = 'teste';
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasets']) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    this.chartData.labels = this.datasets.labels;
    this.chartData.datasets = this.datasets.datasets.map((dataSet) => ({
      data: dataSet.data,
      borderColor: dataSet.borderColor,
      backgroundColor: dataSet.backgroundColor || dataSet.borderColor,
      label: dataSet.label,
      fill: false,
    }));
  }
}
