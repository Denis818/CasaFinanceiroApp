import { ChartConfiguration } from 'chart.js';
import { GraphicStyle } from './graphic-style.interface';

export class GraphicConfiguration {
  chartData: ChartConfiguration['data'];
  graphicStyle: GraphicStyle;
  chartOptions: ChartConfiguration['options'];

  constructor() {
    this.chartData = { datasets: [], labels: [] };
    this.graphicStyle = {
      graphicType: 'line',
      width: 700,
      height: 400,
    };
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    };
  }
}
