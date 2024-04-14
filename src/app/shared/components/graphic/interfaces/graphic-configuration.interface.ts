import { ChartConfiguration } from 'chart.js';
import { GraphicDesktop } from './graphic-desktop.interface';

export interface GraphicConfiguration {
  chartData: ChartConfiguration['data'];
  graphicStyle: GraphicDesktop;
  chartOptions: ChartConfiguration['options'];
}
