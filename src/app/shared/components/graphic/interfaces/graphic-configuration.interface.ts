import { ChartConfiguration } from 'chart.js';

export interface GraphicConfiguration {
  chartData: ChartConfiguration['data'];
  chartOptions: ChartConfiguration['options'];
}
