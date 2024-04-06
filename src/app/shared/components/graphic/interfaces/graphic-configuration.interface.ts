import { ChartConfiguration } from 'chart.js';
import { GraphicStyle } from './graphic-style.interface';

export interface GraphicConfiguration {
  chartData: ChartConfiguration['data'];
  graphicStyle: GraphicStyle;
  chartOptions: ChartConfiguration['options'];
}
